import { MdForum as ForumImg } from "react-icons/md";
import { BsUiChecksGrid as ChecklistImg } from "react-icons/bs";
import { CgProfile as ProfileImg } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Container } from "./style";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

export function Header() {
  const navigate = useNavigate();

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
          <MenuItem className="drop-item">Minhas informações</MenuItem>
          <MenuItem className="drop-item">Sair</MenuItem>
        </Menu>
      </div>
      
    </Container>
  );
}
