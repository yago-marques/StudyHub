import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillTrashFill as Check } from "react-icons/bs"
import { toast } from "react-toastify"
import { Header } from "../../components/Header"
import { SprintScreen } from "../../components/SprintScreen"
import { Auth } from "../../firebase/Authentication/Auth"
import { CheckList } from "../../firebase/CheckList/CheckList"
import { Container } from "./style"

interface TaskProps {
  created_at: string;
  title: string;
  uid: string;
  user_id: string;
}

export function Checklist() {
  const [tasks, setTasks] = useState<TaskProps[]>()
  const [userUid, setUserUid] = useState("")
  const [title, setTitle] = useState("")
  const [update, setUpdate] = useState(false)
  const [loading, setLoading ] = useState(true)
  const navigate = useNavigate()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const auth = new Auth({})

  useEffect(() => {
    auth.verifyUserUid({navigate, setLoading})
    auth.getUserUid(uid => {
      setUserUid(uid)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const checklistService = new CheckList()
    checklistService.listTasks(userUid, tasks => setTasks(tasks))
  }, [userUid, update])

  function handleNewTask() {
    const checklistService = new CheckList()
    if (title !== "") {
      checklistService.createNewTask(userUid, title, update, setUpdate)
      setTitle("")
    } else {
      toast.warning("Preencha o campo de task")
    }
  }

  function taskAsDone(uid: string) {
    const checklistService = new CheckList()
    checklistService.doneTask(uid, update, setUpdate)
  }

  return(
    <Container>
      { loading ? (
        <SprintScreen />
      ) : (
        <>
          <Header />
          <section className="checklist">
            <div className="add-bar">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Digite uma nova task"
                type="text" 
              />
              <button onClick={handleNewTask} className="addtask">
                Adicionar task
              </button>
            </div>
            <h2>Suas Tasks</h2>
            {tasks?.length === 0 ? (
              <div className="no-task">Nenhuma task</div>
            ) : ( tasks?.map((task) => {
              return (
              <div key={task.uid} className="tasks">
                <div className="content">
                  <p>{task.title}</p>
                  <p className="footer">criado em: {task.created_at}</p>
                </div>
                <button onClick={() => taskAsDone(task.uid)}>
                  <Check className="icon" />
                  Marcar como feita
                </button>
              </div>
            )}))}
          </section>
        </>
      ) }
    </Container>
  )
}