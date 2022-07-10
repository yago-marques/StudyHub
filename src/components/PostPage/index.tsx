import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  BsArrowUpCircle as ArrowUp,
  BsArrowDownCircle as ArrowDown,
} from "react-icons/bs"
import { Post } from "../../firebase/Post/Post";
import { Auth } from "../../firebase/Authentication/Auth";
import { Container } from "./style"
import { SprintScreen } from "../../components/SprintScreen" 
import { AnswerModal } from "../PostAnswerModal";
import { Header } from "../Header";

interface PostDataProps {
  created_at: string;
  edited_at: string;
  title: string;
  description: string;
  owner_uid: string;
  uid: string;
}

interface PostCommentProps {
  uid: string;
  post_uid: string;
  owner_uid: string;
  comment: string;
  created_at: string;
}

interface PostRatingProps {
  uid: string;
  post_uid: string;
  owner_uid: string;
  value: number;
}

interface TagProps {
  uid: string;
  post_uid: string;
  label: string;
}

interface AnswerProps {
  uid: string;
  post_uid: string;
  owner_uid: string;
  owner_name: string;
  title: string;
  description: string;
  created_at: string;
}

interface AnswerCommentProps {
  uid: string;
  post_uid: string;
  answer_uid: string;
  owner_uid: string;
  comment: string;
  created_at: string;
}

interface AnswerRatingProps {
  uid: string;
  post_uid: string;
  answer_uid: string;
  owner_uid: string;
  value: number;
}

interface DataProps {
  ownerName: string;
  postRatingSum: number;
  postData: PostDataProps;
  postCommentData: PostCommentProps[];
  postRatingsData: PostRatingProps[];
  tagsData: TagProps[];
  postAnswerCommentsData: AnswerCommentProps[];
  postAnswerData: AnswerProps[]
  postAnswerRatingsData: AnswerRatingProps[];
}

export function PostPage() {
  const [postInfo, setPostInfo] = useState<DataProps>()
  const [userUid, setUserUid] = useState("")
  const [showAnswerModal, setShowAnswerModal] = useState(false)

  const params = useParams();
  const postUid = params.post_uid;
  let auth = new Auth({});

  useEffect(() => {
    auth.getUserUid(uid => {
      setUserUid(uid);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const postService = new Post();
    postService.getPostDetail(
      postUid !== undefined ? postUid : "",
      (data: any) => {
        console.log(data)
        setPostInfo(data);
      }
    );
  }, [postUid]);

  function closeAnswerModal() {
    setShowAnswerModal(false)
  }

  return (
    <>
    <Header />
    <AnswerModal 
      onRequestClose={closeAnswerModal} 
      showAnswerModal={showAnswerModal} 
      userUid={userUid}
      postUid={postUid!}
    />
    <Container>
      {postInfo === undefined ? <SprintScreen /> : (
        <>
        <section className="post-area">
          <div className="action-rating">
            <ArrowUp className="icon" />
            <p>{postInfo?.postRatingSum}</p>
            <ArrowDown className="icon" />
          </div>
          <div className="post-data">
            <div className="post-header">
              <p>Criado por: {postInfo?.ownerName}, em: {postInfo?.postData.created_at}</p>
              <p className="tags">Tags: {postInfo?.tagsData.map(tag => ` #${tag.label}, `)}</p>
            </div>
            <h1>{postInfo?.postData.title}</h1>
            <hr />
            <h2>{postInfo?.postData.description}</h2>
          </div>
        </section>
        {postInfo?.postData.owner_uid !== userUid && (
          <button onClick={() => setShowAnswerModal(true)} className="askQuestionBtn">
            Responder
          </button>
        )}
        {postInfo?.postAnswerData.length === 0 ? (
          <div className="no-answer">Post sem resposta</div>
        ) : (
          postInfo?.postAnswerData.map(answer => (
            <section key={answer.uid} className="post-area">
              <div className="post-data">
                <div className="post-header">
                  <p>Criado por: {answer.owner_name}, em: {answer.created_at}</p>
                </div>
                <h1>{answer.title}</h1>
                <hr />
                <h2>{answer.description}</h2>
              </div>
            </section>
          ))
        )}
        </>
      )}
    </Container>
    </>
  );
}
