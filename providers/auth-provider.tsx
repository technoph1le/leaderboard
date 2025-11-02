"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

type AuthContextType = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useLayoutEffect(() => {
    const saved = localStorage.getItem("saved");
    if (saved === "true") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

  const logOut = () => {
    localStorage.removeItem("saved");
    setIsAdmin(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
