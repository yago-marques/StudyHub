import { useState } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify"
import { GrClose as CloseIcon } from "react-icons/gr"
import { Container } from "./style"
import { Post } from "../../firebase/Post/Post"

interface AnswerModalProps {
  userUid: string
  postUid: string
  showAnswerModal: boolean
  onRequestClose: () => void
}

export function AnswerModal({
  showAnswerModal, onRequestClose, userUid, postUid
}: AnswerModalProps) {

  const [title, setTitle] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  
  const postService = new Post()

  function handleSubmit() {
    if (title === "" || answer === "") {
      toast.warning("Preencha os campos")
    } else {
      postService.createPostAnswer({
        post_uid: postUid,
        owner_uid: userUid,
        title: title,
        description: answer,
        setLoading: setLoading
      })
      onRequestClose()
    }
  }

  return (
    <Modal
      isOpen={showAnswerModal}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <Container>
        <CloseIcon 
          className="closeModalIcon"
          onClick={onRequestClose}
        />
        <form>
          <p>Título</p>
          <input 
            type="text" 
            onChange={e => setTitle(e.target.value)}
            placeholder="Tema da sua resposta"
          />
          <p>Descrição</p>
          <textarea 
            onChange={(e: any) => setAnswer(e.target.value)} 
            cols={80} 
            rows={10}
            placeholder="Digite sua resposta"
          >
          </textarea>        
          <button
            type="button"
            onClick={handleSubmit}
          >
            {!loading ? "Enviar" : <div className="loader"></div>}
          </button>
        </form>
        
      </Container>
    </Modal>
  )

}