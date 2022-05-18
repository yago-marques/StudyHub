import { MdForum as ForumImg } from "react-icons/md";
import { BsUiChecksGrid as ChecklistImg } from "react-icons/bs";
import { BiLogOutCircle as LogoutImg } from "react-icons/bi";
import { Auth } from "../../firebase/Authentication/Auth"
import { User } from "../../firebase/Profile/User"
import { App } from "../../firebase/App"
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

export function Header() {
  const navigate = useNavigate();
  const auth = new Auth({})

  return (
    <Container>
      <h1>StudyHub</h1>
      <nav>
        <button onClick={() => {}}>
          <ForumImg className="img" />
          <p>Forúm</p>
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
                  YA
                </span>
              </div>
            </MenuButton>
          }
        >
          <MenuItem 
            onClick={() => {
              App.withUser(data => {
                let student = new User(data)
                student.setEmail("yagovictormarques@gmail.com")
              })
            }}
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
