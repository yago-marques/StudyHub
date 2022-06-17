import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  doc,
  getDoc
} from "firebase/firestore";
import { toast } from "react-toastify"
import { getAuth as getFirebaseAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./credentials"

export class App {
  private app: any
  private auth: any
  private db: any

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getFirebaseAuth(this.app)
    this.db = getFirestore(this.app)
  }

  public getApp() {
    return this.app
  }

  public getAuth() {
    return this.auth
  }

  public getDb() {
    return this.db
  }

  public currentDate(): any {
    let date = new Date()
    let day = date.getDate().toString().padStart(2, "0")
    let month = (date.getMonth()+1).toString().padStart(2, "0")
    let year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  public static withUser(action: (data: any) => void) {
    const app = initializeApp(firebaseConfig)
    const auth = getFirebaseAuth(app)
    const db = getFirestore(app)

    onAuthStateChanged(auth, async user => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          let data = docSnap.data()
          action(data)
        } else {
          toast.error("usuário não encontrado")
        }
      }
    })
  }
}