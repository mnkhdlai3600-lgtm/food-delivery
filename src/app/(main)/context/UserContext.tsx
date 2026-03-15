"use client";

import { handleSignIn, SignInResponseType } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type User = {
  _id?: string;
  email?: string;
  userName?: string;
  phoneNumber?: number;
  user_age?: number;
  address?: string;
  isVerified?: boolean;
  phone_verified?: boolean;
  role?: string;
};

type UserContextType = {
  user?: User;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  loading: true,
  setUser: () => undefined,
  login: async () => undefined,
  logout: () => undefined,
  isLoggedIn: false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    const data: SignInResponseType = await handleSignIn({ email, password });

    const accessToken = data.token || data.accessToken;

    if (!accessToken) {
      throw new Error("Token ирсэнгүй");
    }

    const apiUser = data.data || data.user;

    const loggedUser: User = {
      _id: apiUser?._id || "",
      email: apiUser?.email || email,
      userName: apiUser?.userName || "",
      phoneNumber: apiUser?.phoneNumber,
      user_age: apiUser?.user_age,
      address: apiUser?.address || "",
      isVerified: apiUser?.isVerified,
      phone_verified: apiUser?.phone_verified,
      role: apiUser?.role,
    };

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    setUser(loggedUser);
    setIsLoggedIn(true);

    if (loggedUser.role === "Admin") {
      push("/food-menu");
      return;
    }

    push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");

    setUser(undefined);
    setIsLoggedIn(false);

    push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, setUser, loading, logout, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
