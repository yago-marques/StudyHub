import { useState } from "react"
import Modal from "react-modal"
import { GrClose as CloseIcon } from "react-icons/gr"
import { User } from "../../firebase/Profile/User"
import { Container } from "./style"

interface EditProfileModalProps {
  currentName: string,
  currentEmail: string,
  showEditProfileModal: boolean
  onRequestClose: () => void
}

export function EditProfileModal({
  currentName,
  currentEmail,
  showEditProfileModal, 
  onRequestClose,
}: EditProfileModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: any) {
    event.preventDefault()
    setLoading(true)
    User.withUser(async data => {
      let user = new User(data)
      if(email !== "" && name !== "") {
        await user.setEmail(email, setLoading)
        await user.setName(name, setLoading)
      } else {
        if(email !== "") {
          await user.setEmail(email, setLoading)
        } else {
          if(name !== "") {
            await user.setName(name, setLoading)
          } else {
            setLoading(false)
          }
        }
      }
      onRequestClose()
    })
  }

  return (
    <Modal
      isOpen={showEditProfileModal}
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
          <h1>Editar perfil</h1>
          <p>
            Nome
          </p>
          <input 
            type="text"
            placeholder={currentName}
            maxLength={15}
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <p>
            Email
          </p>
          <input 
            type="email"
            placeholder={currentEmail}
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
          <button
            onClick={handleSubmit}
          >
            {!loading ? "Alterar" : <div className="loader"></div>}
          </button>
        </form>
        
      </Container>
    </Modal>
  )

}