"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";

export const AddLocationDialog = ({ open, setOpen, user, address }: { open: boolean; setOpen: (value: boolean) => void; user: any, address: string }) => {
  const [localAddress, setLocalAddress] = useState(address);

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/user/${user._id}`,
        {localAddress},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        })
        toast.success("Хаяг амжилттай хадгалагдлаа!");

        setOpen(false);
    
    } catch (err) {
      toast.error("Хаяг илгээхэд алдаа гарлаа");
    }
  };

  useEffect(() => {
    setLocalAddress(address)
  }, [address])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Хаяг оруулах</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
        <img src="/Images/huurhnuu.png" className="flex justify-center w-[100px] h-[100px]"/>
        </div>
       
        <textarea
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
          placeholder="Барилгын дугаар, орц, орон сууцны дугаар зэрэг тодорхой хаягийн мэдээллийг оруулна уу"
          className="w-full h-[112px] rounded-lg px-4 py-3 resize-none border"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setOpen(false)} className="border px-4 py-2 rounded-full text-sm">Буцах</button>
          <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded-full text-sm">Оруулах</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
