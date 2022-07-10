import { App } from "../App";
import { v4 } from "uuid";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

interface CreatePostProps {
  ownerUid: string;
  title: string;
  description: string;
  tags: string[];
  setLoading: (state: boolean) => void;
  navigate: (route: string) => void;
}

interface CreatePostTagsProps {
  postUid: string;
  label: string;
}

interface CreatePostRatingProps {
  postUid: string;
  ownerUid: string;
  value: number;
}

interface PostProps {
  uid: string;
  owner_uid: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
}

interface TagProps {
  uid: string;
  post_uid: string;
  label: string;
}

interface RatingProps {
  owner_uid: string;
  post_uid: string;
  uid: string;
  value: number;
}

interface AnswerDataProps {
  uid: string;
  post_uid: string;
  owner_uid: string;
  title: string;
  description: string;
  created_at: string;
}

interface AnswerProps {
  //uid: string;
  post_uid: string;
  owner_uid: string;
  title: string;
  description: string;
  setLoading: (state: boolean) => void;
  //created_at: string;
}

export class Post extends App {
  public async createNewPost({
    ownerUid,
    title,
    description,
    setLoading,
    tags,
    navigate,
  }: CreatePostProps) {
    const uid = v4();
    const newDoc = doc(this.getDb(), "posts", uid);
    await setDoc(newDoc, {
      uid: uid,
      owner_uid: ownerUid,
      title: title,
      description: description,
      created_at: this.currentDate(),
      edited_at: this.currentDate(),
    })
      .then(() => {
        tags.forEach((tag) => {
          this.createPostTags({
            postUid: uid,
            label: tag,
          });
        });

        this.createPostRating({
          postUid: uid,
          ownerUid: ownerUid,
          value: 0,
        });

        setLoading(false);
        toast.success("Post criado");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  public async createPostAnswer({post_uid, owner_uid, title, description, setLoading}: AnswerProps) {
    const uid = v4();
    const newDoc = doc(this.getDb(), "answers", uid);

    await setDoc(newDoc, {
      uid: uid,
      owner_uid: owner_uid,
      post_uid: post_uid,
      title: title,
      description: description,
      created_at: this.currentDate(),
    }).then(() => {
      toast.success("Resposta adiconada")
      setLoading(false)
    }).catch((err) => {
      console.log(err);
      toast.error("Ocorreu um erro")
      setLoading(false)
    })
  }

  private async createPostTags({ postUid, label }: CreatePostTagsProps) {
    const uid = v4();
    const newDoc = doc(this.getDb(), "tags", uid);
    await setDoc(newDoc, {
      uid: uid,
      post_uid: postUid,
      label: label,
    }).catch((err) => {
      console.log(err);
    });
  }

  private async createPostRating({
    postUid,
    ownerUid,
    value,
  }: CreatePostRatingProps) {
    const uid = v4();
    const newDoc = doc(this.getDb(), "post_ratings", uid);
    await setDoc(newDoc, {
      uid: uid,
      post_uid: postUid,
      owner_uid: ownerUid,
      value: value,
    }).catch((err) => {
      console.log(err);
    });
  }

  public async getPosts() {
    const postSnapshot = await getDocs(collection(this.getDb(), "posts"));
    const postData: PostProps[] = [];
    postSnapshot.forEach((post) => {
      postData.push(post.data() as PostProps);
    });
    const dataToSend: any[] = await Promise.all(
      postData.map(async (post) => {
        let userDocRef = doc(this.getDb(), "users", post.owner_uid);
        let userName = "";
        getDoc(userDocRef).then((doc) => {
          let data = doc.data();
          userName = data?.name;
        });

        const tagQuery = query(
          collection(this.getDb(), "tags"),
          where("post_uid", "==", post.uid)
        );
        const tagSnapshot = await getDocs(tagQuery);
        const tagData: TagProps[] = [];
        tagSnapshot.forEach((tag) => {
          tagData.push(tag.data() as TagProps);
        });
        const tagStringData = tagData.map((tag) => {
          return tag.label;
        });

        const ratingQuery = query(
          collection(this.getDb(), "post_ratings"),
          where("post_uid", "==", post.uid)
        );
        const ratingSnapshot = await getDocs(ratingQuery);
        const ratingData: RatingProps[] = [];
        ratingSnapshot.forEach((rating) => {
          ratingData.push(rating.data() as RatingProps);
        });
        let ratingSum = 0;
        ratingData.forEach((rating) => {
          ratingSum += rating.value;
        });

        return {
          uid: post.uid,
          owner_uid4: `#${post.owner_uid.substring(0, 4)}`,
          owner_name: userName,
          title: post.title,
          created_at: post.created_at,
          edited_at: post.edited_at,
          tags: tagStringData,
          rating: ratingSum,
        };
      })
    );

    return dataToSend;
  }

  public async getPostDetail(postUid: string, action: (data: any) => void) {
    const postDoc = doc(this.getDb(), "posts", postUid);
    const tagQuery = query(
      collection(this.getDb(), "tags"),
      where("post_uid", "==", postUid)
    );
    const postRatingQuery = query(
      collection(this.getDb(), "post_ratings"),
      where("post_uid", "==", postUid)
    );
    const postCommentQuery = query(
      collection(this.getDb(), "post_comments"),
      where("post_uid", "==", postUid)
    );
    const answerQuery = query(
      collection(this.getDb(), "answers"),
      where("post_uid", "==", postUid)
    );
    const answerRatingQuery = query(
      collection(this.getDb(), "answer_ratings"),
      where("post_uid", "==", postUid)
    );
    const answerCommentQuery = query(
      collection(this.getDb(), "answer_comments"),
      where("post_uid", "==", postUid)
    );

    const postData = (await getDoc(postDoc)).data();
    let userDocRef = doc(
      this.getDb(),
      "users",
      postData !== undefined ? postData.owner_uid : ""
    );
    let userName = "";
    await getDoc(userDocRef).then((doc) => {
      let data = doc.data();
      userName = data?.name;
    });

    const tags = await getDocs(tagQuery);
    const tagsData: any[] = [];

    tags.forEach((tag) => {
      tagsData.push(tag.data());
    });

    const postRatings = await getDocs(postRatingQuery);
    const postRatingsData: any[] = [];

    postRatings.forEach((rating) => {
      postRatingsData.push(rating.data());
    });
    let postRatingSum = 0;
    postRatingsData.forEach((rating) => {
      postRatingSum += rating.value;
    });

    const postComments = await getDocs(postCommentQuery);
    const postCommentData: any[] = [];

    postComments.forEach((comment) => {
      postCommentData.push(comment.data());
    });

    const postAnswers = await getDocs(answerQuery);
    const postAnswerRawData: any[] = [];

    postAnswers.forEach((answer) => {
      postAnswerRawData.push(answer.data() as AnswerDataProps);
    });

    const postAnswerData = await Promise.all( postAnswerRawData.map(async (answer) => {
      let userDocRef = doc(this.getDb(), "users", answer.owner_uid)
      let userName = "";
      await getDoc(userDocRef).then((doc) => {
      let data = doc.data();
        userName = data?.name;
      });
      return { 
        uid: answer.uid,
        post_uid: answer.post_uid,
        owner_uid: answer.owner_uid,
        owner_name: userName,
        title: answer.title,
        description: answer.description,
        created_at: answer.created_at
      }
    }));

    const postAnswerRatings = await getDocs(answerRatingQuery);
    const postAnswerRatingsData: any[] = [];

    postAnswerRatings.forEach((rating) => {
      postAnswerRatingsData.push(rating.data());
    });

    const postAnswerComments = await getDocs(answerCommentQuery);
    const postAnswerCommentsData: any[] = [];

    postAnswerComments.forEach((comment) => {
      postAnswerCommentsData.push(comment.data());
    });

    const rawData = {
      postData: postData,
      ownerName: userName,
      postRatingSum: postRatingSum,
      tagsData: tagsData,
      postRatingsData: postRatingsData,
      postCommentData: postCommentData,
      postAnswerData: postAnswerData,
      postAnswerRatingsData: postAnswerRatingsData,
      postAnswerCommentsData: postAnswerCommentsData,
    };

    action(rawData)
  }
}
