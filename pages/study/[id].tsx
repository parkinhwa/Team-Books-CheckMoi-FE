import React, { useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import type { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import type { StudyDetailType } from "../../types/studyType";
import { TabPanel } from "../../components";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";
import { PostCard } from "../../components/PostCard";
import { DummyPost } from "../../commons/dummyPost";
import * as S from "../../styles/StudyDetailPageStyle";
import { useUserContext } from "../../hooks/useUserContext";

interface ServerSidePropType {
  studyData: StudyDetailType;
}

// TODO ContextAPI로 User 정보 가져오기
// TODO studyID로 Study 정보 요청하기
// TODO 게시글 작성 버튼
// TODO User가 스터디장일 경우와 아닐 경우 탭, 버튼 권한 부여

const STUDY_OWNER = 0;

const StudyDetailPage = ({ studyData }: ServerSidePropType) => {
  const router = useRouter();
  // TODO studyID를 사용하지 않는 다면 삭제
  const { id: studyID, value: tabValue } = router.query;
  const currentTab = tabValue ? parseInt(tabValue as string, 10) : 0;
  const user = useUserContext();
  const [tabNumber, setTabNumber] = useState(currentTab);
  const { study, members } = studyData;
  const userID = user?.id;
  const ownerID = members[STUDY_OWNER].id;
  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  // TODO 게시글 클릭 시 value 값을 갖고 게시글 상세 페이지로 이동 확인
  // TODO API 연동 확인
  const handlePostClick = (id: number) => {
    router.push(`/boardDetail/${id}`, { query: { tabNumber } });
  };

  // TODO 관리자 탭 0,1 모두 작성 가능
  // TODO 일반 참가자 1번 탭만 작성 가능

  return (
    <>
      <StudyDetailCard study={study} members={members} />
      <Tabs value={tabNumber} onChange={handleTabChange}>
        <Tab label="공지" />
        <Tab label="자유" />
        {userID === ownerID ? <Tab label="관리자" /> : ""}
      </Tabs>
      <TabPanel value={tabNumber} index={0}>
        <Button variant="contained" disabled={userID !== ownerID}>
          글 작성
        </Button>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={1}>
        <Button variant="contained">글 작성</Button>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
      <TabPanel value={tabNumber} index={2}>
        <S.StyledUl>
          {DummyPost.map((post) => (
            <S.StyledList key={post.id}>
              <PostCard post={post} />
            </S.StyledList>
          ))}
        </S.StyledUl>
      </TabPanel>
    </>
  );
};

export default StudyDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const studyID = context.query.id as string;
  const studyData = await getStudyDetailInfo(studyID);
  return { props: { studyData } };
};
