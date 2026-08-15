import {createContext, useContext, useEffect, useState} from "react";
import { decodeJwt, isTokenExpired } from "../utils/jwtUtils";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        setUser(null);
        return;
      }

      const decodedUser = decodeJwt(token);
      setUser(decodedUser);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = decodeJwt(token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isRecruiter: Boolean(user?.isRecruiter),
    isAdmin: Boolean(user?.isAdmin ?? user?._isAdmin),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}