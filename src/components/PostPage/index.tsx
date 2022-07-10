import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../firebase/Post/Post";
import { Auth } from "../../firebase/Authentication/Auth";
import { Container } from "./style"
import { SprintScreen } from "../../components/SprintScreen" 
import { RatingStaper } from "../RatingStaper";
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

interface RatingProps {
  status: string;
  uid: string;
}

export function PostPage() {
  const [postInfo, setPostInfo] = useState<DataProps>()
  const [userUid, setUserUid] = useState("")
  const [rating, setRating] = useState<RatingProps>()
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [update, setUpdate] = useState(false)

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
    postService.getRatingStatus(postUid!, userUid, (status, uid) => {
      setRating({status, uid})
    })
  }, [postUid, userUid, update])

  useEffect(() => {
    const postService = new Post();
    postService.getPostDetail(
      postUid !== undefined ? postUid : "",
      (data: any) => {
        setPostInfo(data);
      }
    );
  }, [postUid, update]);

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
      setUpdate={setUpdate}
    />
    <Container>
      {postInfo === undefined ? <SprintScreen /> : (
        <>
        <section className="post-area">
          <RatingStaper 
            ratingSum={postInfo?.postRatingSum} 
            rating={rating!}
            state={update}
            update={setUpdate}
            postUid={postUid!}
            ownerUid={userUid}
          />
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
