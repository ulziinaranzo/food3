"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PropsWithChildren } from "react";
import { api, setAuthToken } from "@/axios";

export type User = {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
  orderedItems?: any[];
};
type AuthContextType = {
  user?: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<{ data: any; status: number }>;
  signOut: () => void;
  getUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post<{
        token: string;
        user: User;
      }>("/auth/signin", { email, password });

      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      setUser(data.user);

      toast.success("Амжилттай нэвтэрлээ!");
      if (data.user.role === "admin") {
        router.push("/admin/foodmenu");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Нэвтрэхэд алдаа:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
      throw error;
    }
  };

  const signUp = async (newUser: {
    email: string;
    password: string;
    name?: string;
  }): Promise<{ data: any; status: number }> => {
    try {
      const response = await api.post("/auth/signup", newUser);
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      router.push("/");
      return { data: response.data, status: response.status };
    } catch (error: any) {
      throw error;
    }
  };
  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    try {
      setLoading(true);
      const { data } = await api.get<User>("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("GetUser error:", error);
      localStorage.removeItem("token");
      setAuthToken(null);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const signOut = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(undefined);
    router.push("/");
    setIsLoggingOut(false);
    toast.success("Системээс гарлаа");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, getUser, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
