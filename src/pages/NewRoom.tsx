import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import illustration from "../assets/images/illustration.svg";

import logo from "../assets/images/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const [room, setRoom] = useState("");
  const history = useHistory();

  function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (room.trim() === " ") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebaseRoom = roomRef.push({
      title: room,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h1>Olá {user?.name},</h1>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="nome da sala"
              onChange={event => setRoom(event.target.value)}
              value={room}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
