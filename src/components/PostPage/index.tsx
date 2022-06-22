import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Post } from "../../firebase/Post/Post"

export function PostPage() {
  const params = useParams()
  const postUid = params.post_uid

  useEffect(() => {
    const postService = new Post()
    postService.getPostDetail(postUid !== undefined ? postUid : "")
  }, [postUid])

  return (
    <h1>{postUid}</h1>
  )
}