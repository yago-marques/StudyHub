import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "./style"
import { Auth } from "../../firebase/Auth"
import { SprintScreen } from "../../components/SprintScreen" 

export function Home() {
  const [ logged, setLogged ] = useState(true)
  const [ loading, setLoading ] = useState(true)
  const navigate = useNavigate()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const auth = new Auth({})

  useEffect(() => {
    auth.verifyUserUid({setLogged, setLoading})
  }, [auth])

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
          <button onClick={() => auth.userLogout({navigate})}>
            logout
          </button>
        </>
      ) }
      
    </Container>
  )
}