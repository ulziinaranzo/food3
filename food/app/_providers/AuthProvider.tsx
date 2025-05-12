"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type PropsWithChildren = {
  children: React.ReactNode;
};

export type User = {
  name: string;
  email: string;
  image: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  _id: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  token?: string;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success("Амжилттай нэвтэрлээ");

      if (data.user.role === "admin") {
        router.push("/admin/foodmenu");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success("Амжилттай нэвтэрлээ");
      if (data.user.role === "admin") {
        router.push("/admin/foodmenu");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setUser(undefined);
    router.push("/login");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      setLoading(false);
      return;
    }

    setToken(tokenFromStorage);

    const getUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `${tokenFromStorage}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Автомат нэвтрэхэд алдаа:", error);
        localStorage.removeItem("token");
        setToken(undefined);
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, token, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
