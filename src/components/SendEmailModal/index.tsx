import { useState } from "react"
import Modal from "react-modal"
import { GrClose as CloseIcon } from "react-icons/gr"
import { Container } from "./style"
import { Auth } from "../../firebase/Auth"

interface SendEmailModalProps {
  showSendEmailModal: boolean
  onRequestClose: () => void
}

export function SendEmailModal({
  showSendEmailModal, onRequestClose
}: SendEmailModalProps) {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const auth = new Auth()

  return (
    <Modal
      isOpen={showSendEmailModal}
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
          <h1>Recuperação de senha</h1>
          <p>
            Digite o seu email cadastrado
          </p>
          <input 
            type="email"
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              setLoading(true)
              auth.forgotPassword({email, setLoading})
            }}
          >
            {!loading ? "Enviar" : <div className="loader"></div>}
          </button>
        </form>
        
      </Container>
    </Modal>
  )

}