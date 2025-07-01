"use client";

import { getCurrentUser } from "@/services/authService";
import { TUSer } from "@/types/userTypes";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type exportProviderValue = {
  user: TUSer | null;
  isLoading: boolean;
  setUser: (user: TUSer | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<exportProviderValue | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUSer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
    setIsLoading(false);
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("user user can be used only within the Use provider hook");
  }
  return context;
};

export default UserProvider;
