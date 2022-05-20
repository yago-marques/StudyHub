import { Container } from "./style"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { Auth } from "../../firebase/Authentication/Auth"

export function UserRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkedPass, setCheckedPass] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const auth = new Auth({email, password})

  const hasUpper = (str: string) => /[A-Z]/.test(str);
  const hasNumber = (str: string) => /[0-9]/.test(str);

  function handleSubmit(event: any) {
    event.preventDefault()
    setLoading(true)
    if (
      name !== ""
      && email !== ""
      && password === checkedPass
      && hasUpper(password)
      && hasNumber(password)
      && password.length >= 8
    ) {
      auth.newUserRegister({
        name,  
        role: "student", 
        setLoading,
        navigate
      })
    } else {
      toast.warning("preencha os campos corretamente")
      setLoading(false)
    }
    
  }

  return (
    <Container>
      <h1>Cadastro</h1>
      <form>
        <div className="goToLogin">
          <p>
            Já tem uma conta no StudyHub?
          </p>
          <button 
            type="button"
            className="login"
            onClick={() => {
              navigate("/login")
            }}
          >
            Fazer login
          </button>
        </div>
        <div className="row">
          <div>
            <span>Username</span>
            <input 
              type="text" 
              maxLength={50}
              onChange={event => {
                setName(event.target.value)
              }}
            />
          </div>
          <div>
            <span>Email</span>
            <input 
              type="email" 
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
          </div>
        </div>

        <div className="row">
          <div>
            <span>Senha</span>
            <input 
              type="password" 
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
          </div>
          <div>
            <span>Confirmação de senha</span>
            <input 
              type="password" 
              onChange={event => {
                setCheckedPass(event.target.value)
              }}
            />
          </div>
        </div>
        <button 
          className="register"
          onClick={handleSubmit}
        >
          {!loading ? "Cadastrar" : <div className="loader"/>}
        </button>
      </form>
    </Container>
    
  )
}