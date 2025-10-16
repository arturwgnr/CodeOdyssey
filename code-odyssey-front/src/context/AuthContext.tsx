import { createContext, useState } from "react";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  refreshSession,
  getPrivate,
} from "../api/api";

/* Interfaces */
interface AuthContextType {
  user: any; // será tipado com base no retorno real do back
  register: (
    name: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* Context */
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  /* ---------- REGISTER ---------- */
  async function register(
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    try {
      const data = await registerApi(name, username, email, password);

      if (data.user) {
        setUser(data.user);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  }

  /* ---------- LOGIN ---------- */
  async function login(email: string, password: string) {
    try {
      const data = await loginApi(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUser(data.user);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  }

  /* ---------- LOGOUT ---------- */
  async function logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await logoutApi(refreshToken);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (error) {
      console.error(error);
      alert("Error logging out");
    }
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
