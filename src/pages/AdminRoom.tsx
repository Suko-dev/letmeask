import { useHistory, useParams } from "react-router-dom";
import { Button } from "../components/button";
import logo from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import "../styles/room.scss";
import { RoomCode } from "../components/roomCode";
import { useAuth } from "../hooks/useAuth";
import { QuestionCard } from "../components/questionCard";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const { id }: RoomParams = useParams();
  const { questions, title } = useRoom(id);

  async function handleDeleteQuestion(questionId: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({ endedAt: new Date() });

    history.push("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="logoimage" />
          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 &&
            questions.map(question => {
              return (
                <QuestionCard
                  key={question.id}
                  author={question.author}
                  content={question.content}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="delete" />
                  </button>
                </QuestionCard>
              );
            })}
        </div>
      </main>
    </div>
  );
}
