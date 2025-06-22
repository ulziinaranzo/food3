"use client";
import { api, setAuthToken } from "@/axios";
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
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
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
      const { data } = await api.post("/auth/signup", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
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
    setUser(undefined);
    setAuthToken(null);
    router.push("/login");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      setLoading(false);
      return;
    }
    setAuthToken(tokenFromStorage);

    const getUser = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (!token) return;
      setAuthToken(token);
      try {
        const { data } = await api.get("/auth/me");
        console.log("irj bgaa hereglegch:", data);

        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        console.error("Автомат нэвтрэхэд алдаа:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
