"use client";

import useUser from "@/hooks/use-user";
import { createContext, useContext, ReactNode } from "react";

interface UserContextValue {
  user: {
    username: string;
    role: string;
  } | null;
  loading: boolean;
  logout: () => void;
  refetch: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const userState = useUser();

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
