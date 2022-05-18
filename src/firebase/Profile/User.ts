import { App } from "../App";
import { updateEmail } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

interface UserProps {
  email: string;
  name: string;
  role: string;
  uid: string;
}

interface UpdateUserInfoProps {
  email: string;
  name: string;
  role: string;
}

export class User extends App {
  private email: string;
  private name: string;
  private role: string;
  private uid: string;

  constructor({ email, name, role, uid }: UserProps) {
    super();
    this.email = email;
    this.name = name;
    this.role = role;
    this.uid = uid;
  }

  public getEmail(): string {
    return this.email
  }

  public async setEmail(email: string) {
    updateEmail(this.getAuth().currentUser, email)
      .then(() => {
        this.email = email
        this.updateUserInfo({email: this.email, name: this.name, role: this.role})
      })
      .catch(err => {
        console.log(err)
      })
    
  }

  public getName(): string {
    return this.name
  }

  public async setName(name: string) {
    this.name = name
    this.updateUserInfo({email: this.email, name: this.name, role: this.role})
  }

  public getRole(): string {
    return this.role
  }

  private async updateUserInfo({ email, name, role }: UpdateUserInfoProps) {
    const userRef = doc(this.getDb(), "users", this.uid)
    await updateDoc(userRef, {
      email: email,
      name: name,
      role: role
    }).then(() => {
      toast.success("informação alterada com sucesso")
    }).catch(err => {
      console.log(err)
    })
  }
}
