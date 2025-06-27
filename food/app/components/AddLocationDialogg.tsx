"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "../_providers/AuthProvider";
import { HashLoader } from "react-spinners";
import { api } from "@/axios";
import { setAuthToken } from "@/axios";

export const AddLocationDialog = ({
  open,
  setOpen,
  address,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  address: string;
}) => {
  const [localAddress, setLocalAddress] = useState(address);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, getUser, setUser } = useAuth(); // ✅ setUser нэмэгдсэн

  const handleSubmit = async () => {
    if (!user || !(user._id || user.id)) {
      toast.error("Хэрэглэгчийн мэдээлэл олдсонгүй.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) setAuthToken(token);

      const res = await api.put(`/user/${user._id || user.id}`, {
        address: localAddress,
      });

      // ✅ 1: setUser ашиглах (эсвэл)
      setUser(res.data.user);

      // ✅ 2: эсвэл getUser() дуудах (илүү найдвартай)
      // await getUser();

      toast.success("Хаяг амжилттай хадгалагдлаа!");
      setOpen(false);
    } catch (err) {
      toast.error("Хаяг илгээхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Хаяг оруулах</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <img
            src="/Images/huurhnuu.png"
            className="flex justify-center w-[100px] h-[100px]"
          />
        </div>

        <textarea
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
          placeholder="Барилгын дугаар, орц, орон сууцны дугаар зэрэг тодорхой хаягийн мэдээллийг оруулна уу"
          className="w-full h-[112px] rounded-lg px-4 py-3 resize-none border"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setOpen(false)}
            className="border px-4 py-2 rounded-full text-sm"
          >
            Буцах
          </button>
          <button
            onClick={handleSubmit}
            disabled={!user || loading}
            className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center justify-center min-w-[80px]"
          >
            {loading ? <HashLoader size={20} color="#fff" /> : "Оруулах"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
