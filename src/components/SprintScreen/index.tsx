import { Container } from "./style"
import { useNavigate } from "react-router-dom"

export function SprintScreen() {
  const navigate = useNavigate()

  return (
    <Container>
      <div className="loader"></div>
      {setTimeout(() => {
        <button
          onClick={() => {
            localStorage.clear()
            navigate("/home")
          }}
        >
          Cancelar
        </button>
      }, 3000)}
      
    </Container>
  )
}