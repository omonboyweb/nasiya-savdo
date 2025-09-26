import React from "react";
import { getStorage, setStorage } from "../store/local-storage";
import type { ReactNode } from "react";

type User = {
  id: number;
  username: string;
  role: string;
} | null;

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(
    getStorage("access_token")
  );
  const [user, setUser] = React.useState<User>(getStorage("user") || null);
  const login = (tok: string, userObj: User) => {
    setToken(tok);
    setUser(userObj);
    setStorage("access_token", tok);
    setStorage("user", userObj);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    setStorage("access_token", null);
    setStorage("user", null);
  };
  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const getAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
