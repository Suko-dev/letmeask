import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Button } from "../components/button";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, siginWithGoogle } = useAuth();
  const [room, setRoom] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await siginWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (room.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`rooms/${room}`).get();

    if (!roomRef.exists()) {
      // eslint-disable-next-line no-alert
      alert("Room does not exists!");
      return;
    }

    history.push(`/rooms/${room}`);
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              onChange={event => setRoom(event.target.value)}
              value={room}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
