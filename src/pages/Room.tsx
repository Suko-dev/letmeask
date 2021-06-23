import { FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/button";
import logo from "../assets/images/logo.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/roomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { QuestionCard } from "../components/questionCard";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    isHilighted: boolean;
    isAnswered: boolean;
    content: string;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  isHilighted: boolean;
  isAnswered: boolean;
  content: string;
};

export function Room() {
  const { user } = useAuth();
  const { id }: RoomParams = useParams();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.once("value", room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parseQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHilighted: value.isHilighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setQuestions(parseQuestion);
      setTitle(databaseRoom.title);
    });
  }, [id]);

  async function handleCreateRoomQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("you must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHilighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${id}/questions`).push(question);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="logoimage" />
          <RoomCode code={id} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleCreateRoomQuestion}>
          <textarea
            placeholder="o que voce quer perguntar"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt="user avatar" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                para continuar, <button type="button">faça login</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              enviar pergunta
            </Button>
          </div>
        </form>

        {questions.length > 0 &&
          questions.map(value => {
            return (
              <QuestionCard author={value.author} content={value.content} />
            );
          })}
      </main>
    </div>
  );
}
