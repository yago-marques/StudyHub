import { useEffect, useState } from "react"
import { GrClose as CloseIcon } from "react-icons/gr"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import { Post } from "../../firebase/Post/Post"
import { Auth } from "../../firebase/Authentication/Auth"
import { Container } from "./style"

interface NewPostModalProps {
  showNewPostModal: boolean
  onRequestClose: () => void
  state: boolean
  update: (state: boolean) => void
}

export function NewPostModal({
  showNewPostModal, 
  onRequestClose,
  state,
  update
}: NewPostModalProps) {
  const [owner_uid, setOwnerUid] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [newTag, setNewTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const authService = new Auth({})
    authService.getUserUid(uid => setOwnerUid(uid))
  }, [])

  function createNewPost(e: any) {
    e.preventDefault()
    const postService = new Post()    
    
    postService.createNewPost({
      ownerUid: owner_uid,
      title: title,
      description: description,
      tags: tags,
      setLoading: setLoading,
      navigate: navigate
    })
    update(!state)
    onRequestClose()
  }

  return (
    <Modal
      isOpen={showNewPostModal}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-max"
      ariaHideApp={false}
    >
      <Container>
        <CloseIcon 
          className="closeModalIcon"
          onClick={onRequestClose}
        />
        <form>
          <h1>Criar nova pergunta</h1>
          <div className="row">
            <div>
              <span>Título</span>
              <input 
                type="text" 
                placeholder="Digite o título da sua pergunta"
                onChange={event => {
                  setTitle(event.target.value)
                }}
              />
            </div>
            <div>
              <span>{tags.length === 0 ? "Tags" : (
                tags.map(tag => `#${tag}, `)
              )}</span>
              <input 
                type="text" 
                placeholder="Digite uma tag e clique em adicionar"
                value={newTag}
                onChange={event => {
                  setNewTag(event.target.value)
                }}
              />
              <button 
                className="register inline"
                onClick={(e) => {
                  e.preventDefault()
                  setTags(prevTags => [...prevTags, newTag])
                  setNewTag("")
                }}
              >
                Adicionar
              </button>
            </div>
          </div>
          <div className="row">
            <div>
              <span>Descrição</span>
              <textarea 
                cols={50}
                rows={10}
                placeholder="Digite sua pergunta"
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button 
            className="register"
            onClick={createNewPost}
          >
            {!loading ? "Perguntar" : <div className="loader"/>}
          </button>
        </form>
      </Container>
    </Modal>
  )
}