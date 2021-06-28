import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
    likes: Record<string, { authorId: string }>;
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
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(id: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.on("value", room => {
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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([, item]) => item.authorId === user?.id
            )?.[0],
          };
        }
      );
      setQuestions(parseQuestion);
      setTitle(databaseRoom.title);
    });

    return () => roomRef.off("value");
  }, [id, user?.id]);

  return { questions, title };
}
