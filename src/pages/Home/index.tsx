import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "./style"
import { Auth } from "../../firebase/Authentication/Auth"
import { SprintScreen } from "../../components/SprintScreen" 
import { Header } from "../../components/Header"

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
          <Header />
        </>
      ) }
      
    </Container>
  )
}