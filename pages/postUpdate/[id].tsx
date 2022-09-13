import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPost } from "../../apis";
import { NoAccess } from "../../components/NoAccess";
import { PostForm } from "../../features";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";

interface PostType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writerId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

const postUpdatePage = () => {
  const router = useRouter();
  const { id, isStudyMember } = router.query;
  const [post, setPost] = useState({} as PostType);
  const { renderSnackbar } = useOurSnackbar();

  useEffect(() => {
    const getPostApi = async (postId: number) => {
      try {
        const postData = await getPost(postId);
        setPost(postData);
      } catch (error: any) {
        const { message } = error.response.data.errors[0];
        renderSnackbar(message, "error");
      }
    };
    if (id) getPostApi(Number(id));
  }, [id, post]);

  return (
    <div>
      {post.id && isStudyMember ? (
        <PostForm
          state="PUT"
          selectValue={post.category}
          postId={post.id}
          title={post.title}
          content={post.content}
          studyId={post.studyId}
          isStudyMember={isStudyMember === "true"}
        />
      ) : (
        <NoAccess
          title="이 페이지의 접근 권한이 없습니다."
          description="스터디 가입을 하면 페이지에 접근할 수 있습니다."
        />
      )}
    </div>
  );
};

export default postUpdatePage;
