// imports
import { getDoc, setDoc, doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { toast } from "react-toastify";
import { App } from "../App";

// interfaces
interface SignInProps {
  setLoading: (state: boolean) => void;
  setLogged: (state: boolean) => void;
}

interface LogoutProps {
  navigate: (route: string) => void;
}

interface VerifyUserUidProps {
  navigate: (state: string) => void;
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
  email?: string;
  password?: string;
}

// class
export class Auth extends App {
  private email!: string;
  private password!: string;

  constructor({ email, password }: InitProps) {
    super();
    if (email !== undefined) {
      this.email = email;
    }
    if (password !== undefined) {
      this.password = password;
    }
  }

  public userSignIn({ setLoading, setLogged }: SignInProps) {
    signInWithEmailAndPassword(this.getAuth(), this.email, this.password)
      .then(async (response) => {
        const uid = response.user.uid;

        let docRef = doc(this.getDb(), "users", uid);

        getDoc(docRef)
          .then((doc) => {
            let data = doc.data()!;
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userUid", data.uid);
            toast.success("Usuário logado");
            setLogged(true);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.message)
          });
      })
      .catch((error) => {
        toast.error("Email ou senha inválida");
        console.log(error);
        setLoading(false);
      });
  }

  public userLogout({ navigate }: LogoutProps) {
    signOut(this.getAuth()).then(() => {
      toast.success("Usuário desconectado")
      navigate("/login");
    }).catch((error) => {
      console.log(error);
      toast.error("Erro");
    })
    
  }

  public newUserRegister({
    name,
    role,
    setLoading,
    navigate,
  }: UserRegisterProps) {
    createUserWithEmailAndPassword(this.getAuth(), this.email, this.password)
      .then(async (user) => {
        let userUid = user.user.uid;
        await setDoc(doc(this.getDb(), "users", userUid), {
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

  public async verifyUserUid({ navigate, setLoading }: VerifyUserUidProps) {
    onAuthStateChanged(this.getAuth(), user => {
      if (user?.uid) {
        setLoading(false)
      } else {
        setLoading(false)
        navigate("/login")
      }
    })
  }

  public forgotPassword({ setLoading }: ForgotPasswordProps) {
    sendPasswordResetEmail(this.getAuth(), this.email)
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
