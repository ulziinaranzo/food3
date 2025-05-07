"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type PropsWithChildren = {
  children: React.ReactNode;
};

type User = {
  name: string;
  email: string;
  image: string;
  role: string;
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/auth/signin", {
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
      const { data } = await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error(error);
      toast.error("Бүртгүүлэхэд алдаа гарлаа");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
