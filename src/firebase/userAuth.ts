import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs,
  setDoc,
  doc
} from "firebase/firestore";

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail
} from "firebase/auth";

import { toast } from "react-toastify"

import { firebaseConfig } from "./credentials"

interface SignInProps{
  email: string
  password: string
  setLoading: (state: boolean) => void
  setLogged: (state: boolean) => void
}

interface LogoutProps {
  navigate: (route: string) => void
}

interface VerifyUserUidProps {
  setLogged: (state: boolean) => void
  setLoading: (state: boolean) => void
}

interface ResetPasswordProps {
  email: string
  setLoading: (state: boolean) => void
}

interface UserRegisterProps {
  name: string
  email: string
  password: string
  role: string
  setLoading: (state: boolean) => void
  navigate: (route: string) => void
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
          toast.success("Usuário logado")
          setLogged(true)
        }
      });
      setLoading(false)
    })
    .catch(error => {
      toast.error("Email ou senha inválida")
      console.log(error)
      setLoading(false)
    });
}

export function UserLogout({navigate}: LogoutProps) {
  localStorage.clear()
  navigate("/login")
}

export function NewUserRegister({
  name, 
  email, 
  password, 
  role, 
  setLoading,
  navigate
}: UserRegisterProps) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async user => {
    let userUid = user.user.uid
    await setDoc(doc(db, "users", email), {
      name: name,
      email: email,
      role: role,
      uid: userUid
    });
    setLoading(false)
    toast.success("Conta cadastrada")
    navigate("/login")
  })
  .catch(error => {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      toast.error("Esse email já está em uso")
    } else {
      toast.error("Falha no cadastro")
    }
    setLoading(false)
  });
}

export async function verifyUserUid({setLogged, setLoading}: VerifyUserUidProps) {
  if (localStorage.getItem("userRole") && localStorage.getItem("userUid")) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(user => {
      let data = user.data()
      data.uid === localStorage.getItem("userUid") && setLoading(false)
    })
  } else {
    setLogged(false)
    setLoading(false)
  }
}

export function ResetPassword({email, setLoading}: ResetPasswordProps) {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Email enviado com sucesso")
    setLoading(false)
  })
  .catch((error) => {
    toast.error("Email inválido")
    setLoading(false)
  });
}