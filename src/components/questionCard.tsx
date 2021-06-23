import "../styles/question-card.scss";

type Question = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
};

export function QuestionCard({ author, content }: Question) {
  return (
    <div className="question-card">
      <div className="user-info">
        <img src={author.avatar} alt="user avatar" />
        <span>{author.name}</span>
      </div>
      <p className="question-area">{content}</p>
    </div>
  );
}
