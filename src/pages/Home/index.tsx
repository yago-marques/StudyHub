import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//import { toast } from "react-toastify"
import { Container } from "./style"
import { verifyUserUid, UserLogout } from "../../firebase/userAuth"
import { SprintScreen } from "../../components/SprintScreen" 

export function Home() {
  const [ logged, setLogged ] = useState(true)
  const [ loading, setLoading ] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    verifyUserUid({setLogged, setLoading})
  }, [])

  useEffect(() => {
    logged || navigate("/login")
  }, [logged, navigate])

  return(
    <Container>
      { loading ? (
        <SprintScreen />
      ) : (
        <>
          <h1>Home page</h1>
          <button onClick={() => UserLogout({navigate})}>
            logout
          </button>
        </>
      ) }
      
    </Container>
  )
}