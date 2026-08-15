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

    if (isTokenExpired(token)) {
      logout();
      return;
    }
    const decodedUser = decodeJwt(token);
    if (!decodedUser) {
      logout();
      return;
    }

    setUser(decodedUser);
    // Automatically logout exactly when
    // the JWT expires.
    if (decodedUser.exp) {
      const expirationTime = decodedUser.exp * 1000;
      const remainingTime =  expirationTime - Date.now();
      const logoutTimer = setTimeout(() => {
          logout();
        }, remainingTime);

      return () =>
        clearTimeout(logoutTimer);
    }
  }, []);

    useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);
  const login = (token) => {
    const decodedUser = decodeJwt(token);
    if (!decodedUser) {
      logout();
      return;
    }

    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const isRecruiter = Boolean(user?.isRecruiter);
  const isAdmin = Boolean(user?.isAdmin ?? user?._isAdmin);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isRecruiter,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}