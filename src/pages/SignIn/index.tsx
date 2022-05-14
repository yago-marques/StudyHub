import { useState } from "react"
import { Container } from "./style"
import { useNavigate } from "react-router-dom"
import { UserSignIn } from "../../firebase/userAuth"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(false)
  const [forgotPass, setForgotPass] = useState(false)

  const navigate = useNavigate()
  logged && navigate("/home")

  return (
    <Container>
      <section>
        <form>
          <div>
            <span>Email</span>
            <input 
              type="email" 
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
          </div>
          <div>
            <span>Senha</span>
            <input 
              type="password"
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
          </div>
          <div className="buttons">
            <button 
              className="login"
              onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                UserSignIn({email, password, setLoading, setLogged})
              }}
            >
              {!loading ? "Entrar" : <div className="loader"/>}
            </button>
            <button 
              type="button"
              className="forgotPass"
              onClick={e => {
                e.preventDefault()
                setForgotPass(true)
              }}
            >
              Esqueceu a senha?
            </button>
          </div>
        </form>
      </section>
    </Container>
  )
}