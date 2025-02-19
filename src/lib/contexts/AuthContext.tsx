"use client";

import { createContext, useContext, useState } from "react";
import User from "@/lib/types/User";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (password == password) {
      console.log("password is correct");
    }
    const authenticatedUser: User = { id: "1", email, userType: "customer" }; // Replace with actual user data
    setUser(authenticatedUser);
  };

  const logout = () => {
    // Add logout logic here
    // For example, you can clear the user state and remove any authentication tokens
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
