import { App } from "../App";
import { v4 } from "uuid"
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

interface CreatePostProps {
  ownerUid: string;
  title: string;
  description: string
  tags: string[]
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
  value: number
}

interface PostProps {
  uid: string
  owner_uid: string
  title: string
  description: string
  created_at: string
  edited_at: string
}

interface TagProps {
  uid: string
  post_uid: string
  label: string
}

interface RatingProps {
  owner_uid: string
  post_uid: string
  uid: string
  value: number
}

export class Post extends App {

  public async createNewPost({
    ownerUid,
    title,
    description,
    setLoading,
    tags,
    navigate
  }: CreatePostProps) {
    const uid = v4()
    const newDoc = doc(this.getDb(), "posts", uid)
    await setDoc(newDoc, {
      uid: uid,
      owner_uid: ownerUid,
      title: title,
      description: description,
      created_at: this.currentDate(),
      edited_at: this.currentDate(),
    }).then(() => {

      tags.forEach(tag => {
        this.createPostTags({
          postUid: uid,
          label: tag
        })
      })

      this.createPostRating({
        postUid: uid,
        ownerUid: ownerUid,
        value: 0
      })

      setLoading(false)
      toast.success("Post criado")
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  private async createPostTags({
    postUid,
    label
  }: CreatePostTagsProps) {
    const uid = v4()
    const newDoc = doc(this.getDb(), "tags", uid)
    await setDoc(newDoc, {
      uid: uid,
      post_uid: postUid,
      label: label
    }).catch(err => {
      console.log(err)
    })
  }

  private async createPostRating({
    postUid,
    ownerUid,
    value
  }: CreatePostRatingProps) {
    const uid = v4()
    const newDoc = doc(this.getDb(), "post_ratings", uid)
    await setDoc(newDoc, {
      uid: uid,
      post_uid: postUid,
      owner_uid: ownerUid,
      value: value
    }).catch(err => {
      console.log(err)
    })
  } 

  public async getPosts() {
    const postSnapshot = await getDocs(collection(this.getDb(), "posts"))
    const postData: PostProps[] = []
    postSnapshot.forEach(post => {
      postData.push(post.data() as PostProps)
    })
    const dataToSend: any[] = await Promise.all ( postData.map(async post => {

      let userDocRef = doc(this.getDb(), "users", post.owner_uid)
      let userName = ""
      getDoc(userDocRef).then(doc => {
        let data = doc.data()
        userName = data?.name
      })

      const tagQuery = query(
        collection(this.getDb(), "tags"), 
        where("post_uid", "==", post.uid)
      )
      const tagSnapshot = await getDocs(tagQuery)
      const tagData: TagProps[] = []
      tagSnapshot.forEach(tag => {
        tagData.push(tag.data() as TagProps)
      })
      const tagStringData = tagData.map(tag => {
        return tag.label
      })

      const ratingQuery = query(
        collection(this.getDb(), "post_ratings"), 
        where("post_uid", "==", post.uid)
      )
      const ratingSnapshot = await getDocs(ratingQuery)
      const ratingData: RatingProps[] = []
      ratingSnapshot.forEach(rating => {
        ratingData.push(rating.data() as RatingProps)
      })
      let ratingSum = 0
      ratingData.forEach(rating => {
        ratingSum += rating.value
      })

      return {
        uid: post.uid,
        owner_uid4: `#${post.owner_uid.substring(0, 4)}`,
        owner_name: userName,
        title: post.title,
        created_at: post.created_at,
        edited_at: post.edited_at,
        tags: tagStringData,
        rating: ratingSum
      }
      
    }))

    return dataToSend
  }
}