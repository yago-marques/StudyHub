/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit as EditIcon } from "react-icons/fi";
import { Auth } from "../../firebase/Authentication/Auth";
import { User } from "../../firebase/Profile/User";
import { EditProfileModal } from "../../components/EditProfileModal";
import { SprintScreen } from "../../components/SprintScreen";
import { Container } from "./style";
import { Header } from "../../components/Header";

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [uid4, setUid4] = useState("");
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const auth = new Auth({});

  useEffect(() => {
    auth.verifyUserUid({ navigate, setLoading });

    User.withUser((data) => {
      let user = new User(data);
      setName(user.getName());
      setEmail(user.getEmail());
      setRole(user.getRole());
      setUid4(user.getUid4());
    });
  }, [auth, navigate]);

  return (
    <Container>
      {loading ? (
        <SprintScreen />
      ) : (
        <>
          <Header />
          <EditProfileModal 
            currentName={name}
            currentEmail={email}
            showEditProfileModal={showEditProfileModal}
            onRequestClose={() => {
              setShowEditProfileModal(false)
            }}
          />
          <section className="content">
            <section className="personal-data">

              <EditIcon 
                className="edit"
                onClick={() => {
                  setShowEditProfileModal(true)
                }}
              />

              <h2>Dados pessoais</h2>

              <div className="shape">
                <div className="field">
                  <h3>Nome: </h3>
                  <div className="value">
                    {name === "" ? (
                      <div className="loader"></div>
                    ) : (
                      <>
                        {name}
                        <span>#{uid4}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="field">
                  <h3>Email: </h3>
                  <div className="value">
                    {email === "" ? <div className="loader"></div> : email}
                  </div>
                </div>

                <div className="tag">
                  <span>
                    {role === "" ? "........" : role}
                  </span>
                </div>
              </div>
            </section>

            <section className="posts-area">
              <h2>
                Posts
              </h2>
              <div className="shape">
                <p>
                  Nenhum post criado
                </p>
              </div>
            </section>
          </section>
          
        </>
      )}
    </Container>
  );
}
