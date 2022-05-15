import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs
} from "firebase/firestore";

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail
} from "firebase/auth";

import { firebaseConfig } from "./credentials"

interface SignInProps{
  email: string
  password: string
  setLoading: (state: boolean) => void
  setLogged: (state: boolean) => void
}

interface VerifyUserUidProps {
  setLogged: (state: boolean) => void
  setLoading: (state: boolean) => void
}

interface ResetPasswordProps {
  email: string
  setLoading: (state: boolean) => void
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function UserSignIn({email, password, setLoading, setLogged}: SignInProps) {
  signInWithEmailAndPassword(auth, email, password)
    .then( async response => {
      const uid = response.user.uid
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach(doc => {
        let data = doc.data()
        if (data.uid === uid) {
          localStorage.setItem("userRole", data.role)
          localStorage.setItem("userUid", data.uid)
          setLogged(true)
        }
      });
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
    });
}

export function UserRegister() {
  createUserWithEmailAndPassword(auth, "yagovictormarques@gmail.com", "yago123")
  .then(user => {
    console.log(user)
  })
  .catch((error) => {
    console.log(error)
  });
}

export async function verifyUserUid({setLogged, setLoading}: VerifyUserUidProps) {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach(doc => {
    let data = doc.data()
    let count = 0
    
    if(localStorage.getItem("userUid")) {
      if (data.uid === localStorage.getItem("userUid")) {
        count++
      }
    }
    
    count === 0 && setLogged(false)
    setLoading(false)
  })
}

export function ResetPassword({email, setLoading}: ResetPasswordProps) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("ok")
    setLoading(false)
  })
  .catch((error) => {
    console.log(error)
    setLoading(false)
  });
}