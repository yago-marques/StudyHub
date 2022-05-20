import { MdForum as ForumImg } from "react-icons/md";
import { BsUiChecksGrid as ChecklistImg } from "react-icons/bs";
import { BiLogOutCircle as LogoutImg } from "react-icons/bi";
import { Auth } from "../../firebase/Authentication/Auth"
import { User } from "../../firebase/Profile/User"
import { App } from "../../firebase/App"
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useEffect, useState } from "react";

export function Header() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  const auth = new Auth({})

  useEffect(() => {
    App.withUser(data => {
      let user = new User(data)
      setUsername(user.getName().substring(0,2).toUpperCase())
    })
  }, [])

  function handleUserInfo() {
    navigate("/perfil")
  }

  return (
    <Container>
      <h1>StudyHub</h1>
      <nav className="toLeft">
        <button onClick={() => {
          navigate("/home")
        }}>
          <ForumImg className="img" />
          <p>Fórum</p>
        </button>

        <button onClick={() => {}}>
          <ChecklistImg className="img" />
          <p>Checklist</p>
        </button>
      </nav>

      <div className="menu">
        <Menu
          menuButton={
            <MenuButton>
              <div className="bgUser">
                <span>
                  {username === "" ? <div className="loader"></div> : username}
                </span>
              </div>
            </MenuButton>
          }
        >
          <MenuItem 
            onClick={handleUserInfo}
            className="drop-item"
          >
            Minhas informações
          </MenuItem>
          <MenuItem
            className="drop-item"
            onClick={() => {
              auth.userLogout({navigate})
            }}
          >
            <LogoutImg className="img" />
            <span>
              Sair
            </span>
          </MenuItem>
        </Menu>
      </div>
      
    </Container>
  );
}
