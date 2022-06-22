import { useEffect, useState } from "react"
import { AiOutlineSearch as SearchIcon } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { Auth } from "../../firebase/Authentication/Auth"
import { Post } from "../../firebase/Post/Post"
import { Container } from "./style"

interface PostsProps {
  uid: string
  owner_uid4: string
  owner_name: string
  created_at: string
  edited_at: string
  title: string
  tags: string[]
  rating: number
}

export function Forum() {
const navigate = useNavigate()

  const [posts, setPosts] = useState<PostsProps[]>()
  const [contentLoading, setContentLoading] = useState(true)

  useEffect(() => {
    const postService = new Post()
    postService.getPosts().then(posts => {
      setPosts(posts)
      setContentLoading(false)
    })
  }, [])

  function createNewPost() {
    const postService = new Post()
    const authService = new Auth({})
    postService.getPosts()
    
    authService.getUserUid(uid => {
      postService.createNewPost({
        ownerUid: uid,
        title: "post teste",
        description: "post teste description",
        tags: ["tag01", "tag02"],
        setLoading: (state: boolean) => {console.log("no loading")},
        navigate: (route: string) => {console.log("navegando")}
      })
    })

  }

  return (
    <Container>
      <div className="searchBar">
        <SearchIcon className="icon" />
        <input type="text" placeholder="Pesquisar pergunta" />
      </div>

      <button className="askQuestionBtn" onClick={createNewPost}>
        Perguntar
      </button>

      {contentLoading ? <div className="loaderY"></div> : (
        <>
            <section className="posts">
              <h2 className="posts-title">Perguntas</h2>

              {posts !== undefined && posts.length > 0 && (
                <>
                {posts.map(post => {
                  return (
                  <div className="ask" key={post.uid}>

                    <div className="rating">
                      {post.rating}
                    </div>

                    <button
                      onClick={() => { navigate(`/post/${post.uid}`) }}
                    >
                      <div className="content">

                        <div className="header">
                          <div className="userName">
                            <h3>{post.owner_name}</h3>
                            <span>{post.owner_uid4}</span>
                          </div>
                        </div>

                        <div className="body">
                          <div className="title">
                            <h4>{post.title}</h4>
                          </div>
                          <div className="tags">
                            {post.tags.map(tag => {
                              return (
                                <div className="tag" key={tag}>
                                  <h5>{tag}</h5>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        <div className="footer">
                          <h4>Criado em: {post.created_at}</h4>
                          <h4>Última modificação: {post.edited_at}</h4>
                        </div>

                      </div>
                    </button>
                    

                  </div>
                )})}
                </>
              )}

            </section>
        </>
      )}
      
    </Container>
  ) 
}