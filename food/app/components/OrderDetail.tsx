"use client";
import { CartIcon } from "../assets/CartIcon";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { FoodIcon } from "../assets/FoodIcon";
import { TimeIcon } from "../assets/TimeIcon";
import { LocationIcon } from "../assets/LocationIcon";
import { useEffect, useState } from "react";
import { Food } from "../admin/_components/Types";
import axios from "axios";

type CartItem = {
  quantity: string;
  foodId: string;
};

export const OrderDetail = () => {
  const [cartItems, setCartItems] = useState<(CartItem & Food)[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  const getFoods = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/food`);
      setFoods(response.data?.foodsByCategory || []);
    } catch (error) {
      console.error("Хоолоо татаж авахад алдаа гарлаа:", error);
    }
  };

  const loadCartItems = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const merged = cart
      .map((item) => {
        const foodData = foods.find((f) => f._id === item.foodId);
        return foodData ? { ...item, ...foodData } : null;
      })
      .filter(Boolean) as (CartItem & Food)[];
    setCartItems(merged);
  };

  useEffect(() => {
    const init = async () => {
      await getFoods();
    };
    init();
  }, []);

  useEffect(() => {
    if (foods.length > 0) {
      loadCartItems();
    }
  }, [foods]);

  const updateLocalCart = (updatedItems: (CartItem & Food)[]) => {
    setCartItems(updatedItems);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedItems.map(({ _id, quantity }) => ({
          foodId: _id,
          quantity,
        }))
      )
    );
  };

  const handleIncrease = (foodId: string) => {
    const updated = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, quantity: String(Number(item.quantity) + 1) }
        : item
    );
    updateLocalCart(updated);
  };

  const handleDecrease = (foodId: string) => {
    const updated = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, quantity: String(Math.max(1, Number(item.quantity) - 1)) }
        : item
    );
    updateLocalCart(updated);
  };

  const handleRemove = (foodId: string) => {
    const updated = cartItems.filter((item) => item.foodId !== foodId);
    updateLocalCart(updated);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity) * item.price,
    0
  );

  return (
    <div className="flex flex-col fixed w-[535px] h-full rounded-lg bg-[#404040] p-[32px] top-[0%] left-[50%] z-40">
      <div className="flex gap-[12px]">
        <div className="w-[24px] h-[24px]">
          <CartIcon />
        </div>
        <div className="text-[white] text-[20px] font-[600]">
          Захиалгын мэдээлэл
        </div>
      </div>

      <Tabs defaultValue="cart" className="w-full">
        <TabsList className="grid grid-cols-2 bg-[#EF4444] w-[471px] h-[44px] rounded-full mt-[8px] mb-[8px]">
          <TabsTrigger value="cart" className="text-[18px] rounded-full">
            Cart
          </TabsTrigger>
          <TabsTrigger value="order" className="text-[18px] rounded-full">
            Order
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cart">
          <Card className="bg-white ">
            <CardContent className="flex flex-col gap-[5px]">
              <div className="flex justify-between">
                <h3 className="text-[#09090B] font-[600] text-[20px]">
                  Mиний сагс
                </h3>
                <Button
                  variant="outline"
                  className="w-full text-red-400 border-red-400 rounded-full"
                >
                  Хоол нэмэх
                </Button>
              </div>

              {cartItems.map((item, idx) => (
                <div
                  className={`flex gap-3 items-start pt-1 ${
                    idx < cartItems.length - 1
                      ? "border-b border-dashed border-gray-300"
                      : ""
                  }`}
                  key={item.foodId}
                >
                  <Image
                    src={item.img?.[0]}
                    alt="Food"
                    width={124}
                    height={120}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-red-400 font-[700] text-[16px]">
                      {item.foodName}
                    </p>
                    <p className="text-[12px] font-[400] text-[#09090B]">
                      {item.ingredients}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-black"
                        onClick={() => {
                          handleDecrease(item.foodId);
                        }}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="font-[600] text-[18px] text-[#09090B]">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-black"
                        onClick={() => {
                          handleDecrease;
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 "
                      onClick={() => {
                        const updatedItems = cartItems.filter(
                          (cartFood) => cartFood.foodId !== item.foodId
                        );
                        setCartItems(updatedItems);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(
                            updatedItems.map(({ _id, quantity }) => ({
                              foodId: _id,
                              quantity,
                            }))
                          )
                        );
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <p className="text-[18px] font-[700] text-[#09090B] mt-[30px]">
                      {Number(item.quantity) * item.price}₮
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white rounded-lg text-white mt-[25px] ">
            <CardContent className="">
              <h3 className="font-[600] text-black text-[20px] ">
                Төлбөрийн мэдээлэл
              </h3>
              <div className="flex justify-between text-[16px] mt-[20px]">
                <span className="text-[#71717A] font-[400]">Нийт хоол</span>
                <span className="font-[600] text-black">25.98</span>
              </div>
              <div className="flex justify-between text-[16px] mt-[8px]">
                <span className="text-[#71717A] font-[400]">Хүргэлт</span>
                <span className="font-[600] text-black">$0.99</span>
              </div>
              <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
              <div className="flex justify-between text-[16px] mt-[8px]">
                <span className="text-[#71717A] font-[400]">Нийт</span>
                <span className="font-[600] text-black">$26.97</span>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600 mt-2 rounded-full text-[14px]">
                Checkout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order">
          <Card className="bg-white rounded-lg text-white mt-[25px] ">
            <CardContent className="">
              <h3 className="font-[600] text-black text-[20px] ">
                Захиалгын түүх
              </h3>
              <div className="flex flex-col mt-[20px]">
                <div className="flex justify-between ">
                  <div className="text-black text-[20px] font-bold">
                    26.97₮ (#20156)
                  </div>
                  <button className="px-[10px] py-[6px] border-[1px] border-[red] text-black rounded-full font-semibold text-[12px]">
                    Pending
                  </button>
                </div>
                <div className="flex justify-between text-[12px] mt-[12px]">
                  <div className="flex items-center justify-center gap-[8px]">
                    <FoodIcon />
                    <div className="flex  text-[#71717A]">
                      Sunshine Stackers
                    </div>
                  </div>
                  <div className="text-[#71717A]">x 1</div>
                </div>
                <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
                  <TimeIcon />
                  <div className="text-[#71717A]">2024/12/20</div>
                </div>
                <div className="flex justify-start text-[12px] mt-[12px] gap-[8px]">
                  <div className="w-[16px] h-[16px]">
                    <LocationIcon />
                  </div>
                  <div className="text-[#71717A] truncate">
                    2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
                    emneleg | 100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД,
                    12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen emneleg | 100
                    айлын гүүрэн гарцны хойд талд 4д ногоон20
                  </div>
                </div>
                <div className="border-b border-dashed border-gray-300 pt-[20px]"></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* <div className="flex flex-col gap-[20px]">
        <div className="bg-[#F4F4F5] rounded-lg w-[439px] h-[182px] flex flex-col justify-center items-center px-[32px] gap-[4px]">
          <img src="/Images/naizuud.png" className="w-[61px] h-[50px]" />
          <div className="font-bold text-[16px] text-black">
            Сагс хоосон байна
          </div>
          <div className="font-reguler text-[#71717A] text-[12px]">
            🍔 Гоё гоё хоолнууд захиалж идээрэй, хөөрхнөө ❤️
          </div>
        </div>
        <button className="border-[1px] border-[#EF4444] text-[#EF4444] bg-white flex justify-center items-center w-[440px] h-[44px] rounded-full">
          Хоол нэмэх
        </button>
      </div> */}
    </div>
  );
};
