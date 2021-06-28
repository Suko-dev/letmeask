import { ReactNode } from "react";

import "./style.scss";

type Question = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  // eslint-disable-next-line react/no-unused-prop-types
  children: ReactNode;
};

export function QuestionCard({ author, content, children }: Question) {
  return (
    <div className="question-card">
      <p className="question-area">{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="user avatar" />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
