import { App } from "../App";
import { v4 } from "uuid";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export class CheckList extends App {
  public async createNewTask(userUid: string, title: string, state: boolean, update: (state: boolean) => void) {
    const uid = v4()
    const newTask = {
      user_uid: userUid,
      title: title,
      uid: uid,
      created_at: this.currentDate()
    }
    const docRef = doc(this.getDb(), "tasks", uid)
    await setDoc(docRef, newTask).then(() => {
      update(!state)
      toast.success("Task Adicionada")
    }).catch(err => {
      console.log(err)
      toast.error("Erro no sistema")
    })
  }

  public async listTasks(userUid: string, then: (state: any) => void) {
    const taskQuery = query(collection(this.getDb(), "tasks"), where("user_uid", "==", userUid))
    const rawTasks = await getDocs(taskQuery)
    const tasks: any[] = []
    rawTasks.forEach(task => tasks.push(task.data()))
    then(tasks)
  }

  public async doneTask(taskUid: string, state: boolean, update: (state: boolean) => void) {
    const docRef = doc(this.getDb(), "tasks", taskUid)
    await deleteDoc(docRef).then(() => {
      update(!state)
      toast.success("Task marcada como feita")
    }).catch(err => {
      console.error(err)
      toast.error("houve um erro")
    })
  }
}