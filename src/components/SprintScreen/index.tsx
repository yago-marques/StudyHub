import { Container } from "./style"
import { useNavigate } from "react-router-dom"

export function SprintScreen() {
  const navigate = useNavigate()

  return (
    <Container>
      <div className="loader"></div>
      <button
        onClick={() => {
          localStorage.clear()
          navigate("/login")
        }}
      >
        Cancelar
      </button>
    </Container>
  )
}