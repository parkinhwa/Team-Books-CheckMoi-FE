import { useRouter } from "next/router";
import { NoAccess } from "../../components/NoAccess";
import { PostForm } from "../../features";

const PostCreatePage = () => {
  const router = useRouter();
  const { tabNumber, studyId, isOwner, isStudyMember } = router.query;

  return tabNumber && studyId && isStudyMember ? (
    <PostForm
      state="POST"
      selectValue={tabNumber === "1" ? "GENERAL" : "NOTICE"}
      title=""
      content=""
      studyId={Number(studyId)}
      isOwner={isOwner === "true"}
      isStudyMember={isStudyMember === "true"}
    />
  ) : (
    <NoAccess title="이 페이지의 접근 권한이 없습니다." description="스터디 가입을 하면 페이지에 접근할 수 있습니다." />
  );
};

export default PostCreatePage;
