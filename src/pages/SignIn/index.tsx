import { useState } from "react"
import { Container } from "./style"
import { useNavigate } from "react-router-dom"
import { Auth } from "../../firebase/Auth"
import { SendEmailModal } from "../../components/SendEmailModal"
import studentImg from "../../assets/studentLogin.png"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [logged, setLogged] = useState(false)
  const [forgotPass, setForgotPass] = useState(false)

  const navigate = useNavigate()
  logged && navigate("/home")

  const auth = new Auth()

  return (
    <Container>
      <SendEmailModal
        showSendEmailModal={forgotPass}
        onRequestClose={() => {
          setForgotPass(false)
        }}
      />
      <section className="toggleAuth">
        <h1>
          StudyHub
        </h1>
        <div>
          <p>
            Não tem conta?
          </p>
          <button 
            type="button"
            className="register"
            onClick={() => {
              navigate("/cadastro")
            }}
          >
            Cadastre-se
          </button>
        </div>
        

        <img src={studentImg} alt="" />
      </section>
      <section className="form">
        <form>
          <h2>Login</h2>
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
                auth.userSignIn({email, password, setLoading, setLogged})
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