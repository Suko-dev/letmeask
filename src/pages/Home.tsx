import { useHistory } from "react-router-dom";
import { Button } from "../components/button";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useHistory();
  const { user, siginWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await siginWithGoogle();
    }
    history.push("/rooms/new");
  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="ilustração de perguntas e respostas" />
        <strong>Crie suas salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <button
            className="create-room"
            type="button"
            onClick={handleCreateRoom}
          >
            <img src={googleImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre na sala</div>
          <form>
            <input type="text" placeholder="digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
