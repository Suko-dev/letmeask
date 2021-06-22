/* eslint-disable react/destructuring-assignment */
import { ReactNode, createContext, useState, useEffect } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type authContextType = {
  user: User | undefined;
  siginWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as authContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(result => {
      if (result) {
        const { displayName, photoURL, uid } = result;

        if (!displayName || !photoURL) {
          throw new Error("1");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function siginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("1");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, siginWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
