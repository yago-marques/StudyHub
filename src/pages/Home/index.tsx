import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "./style"
import { Auth } from "../../firebase/Authentication/Auth"
import { SprintScreen } from "../../components/SprintScreen" 
import { Header } from "../../components/Header"
import { Forum } from "../Forum"

export function Home() {
  const [ loading, setLoading ] = useState(true)
  const navigate = useNavigate()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const auth = new Auth({})

  useEffect(() => {
    auth.verifyUserUid({navigate, setLoading})
  }, [auth, navigate])

  return(
    <Container>
      { loading ? (
        <SprintScreen />
      ) : (
        <>
          <Header />
          <Forum />
        </>
      ) }
    </Container>
  )
}