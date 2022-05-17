// imports
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { toast } from "react-toastify";

import { firebaseConfig } from "./credentials";

// interfaces
interface SignInProps {
  setLoading: (state: boolean) => void;
  setLogged: (state: boolean) => void;
}

interface LogoutProps {
  navigate: (route: string) => void;
}

interface VerifyUserUidProps {
  setLogged: (state: boolean) => void;
  setLoading: (state: boolean) => void;
}

interface ForgotPasswordProps {
  setLoading: (state: boolean) => void;
}

interface UserRegisterProps {
  name: string;
  role: string;
  setLoading: (state: boolean) => void;
  navigate: (route: string) => void;
}

interface InitProps {
  email?: string
  password?: string
}

// class
export class Auth {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private db = getFirestore(this.app);
  private email!: string
  private password!: string;

  constructor({email, password}: InitProps) {
    if (email !== undefined) {
      this.email = email
    }
    if (password !== undefined) {
      this.password = password
    }
  }

  public userSignIn({ setLoading, setLogged }: SignInProps) {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (response) => {
        const uid = response.user.uid;
        const querySnapshot = await getDocs(collection(this.db, "users"));
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (data.uid === uid) {
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userUid", data.uid);
            toast.success("Usuário logado");
            setLogged(true);
          }
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Email ou senha inválida");
        console.log(error);
        setLoading(false);
      });
  }

  public userLogout({ navigate }: LogoutProps) {
    localStorage.clear();
    navigate("/login");
  }

  public newUserRegister({
    name,
    role,
    setLoading,
    navigate,
  }: UserRegisterProps) {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (user) => {
        let userUid = user.user.uid;
        await setDoc(doc(this.db, "users", this.email), {
          name: name,
          email: this.email,
          role: role,
          uid: userUid,
        });
        setLoading(false);
        toast.success("Conta cadastrada");
        navigate("/login");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Esse email já está em uso");
        } else {
          toast.error("Falha no cadastro");
        }
        setLoading(false);
      });
  }

  public async verifyUserUid({ setLogged, setLoading }: VerifyUserUidProps) {
    if (localStorage.getItem("userRole") && localStorage.getItem("userUid")) {
      const querySnapshot = await getDocs(collection(this.db, "users"));
      querySnapshot.forEach((user) => {
        let data = user.data();
        data.uid === localStorage.getItem("userUid") && setLoading(false);
      });
    } else {
      setLogged(false);
      setLoading(false);
    }
  }

  public forgotPassword({ setLoading }: ForgotPasswordProps) {
    sendPasswordResetEmail(this.auth, this.email)
      .then(() => {
        toast.success("Email enviado com sucesso");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email inválido");
        setLoading(false);
      });
  }
}
