import { Food } from "../admin/_components/Types";
import { AddIcon } from "../assets/AddIcon";

interface FoodCardHomeProps {
  categoryName: string;
  items: Food[];
}

export const FoodCardHome = ({ categoryName, items }: FoodCardHomeProps) => {
  return (
    <div key={categoryName}>
      <div className="text-white font-[600] text-[30px] mb-6">
        {categoryName}
      </div>
      <div className="grid grid-cols-3 gap-[36px]">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col p-4 gap-5 bg-white rounded-lg shadow-lg relative"
          >
            {item.image?.[0] && (
              <img
                src={item.image?.[0]}
                alt={item.foodName}
                className="w-full h-[210px] object-cover rounded-t-lg"
              />
            )}

            <button className="w-[44px] h-[44px] flex items-center justify-center absolute right-[36px] top-[163px] bg-white z-10 rounded-full cursor-pointer">
              <AddIcon />
            </button>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="font-[600] text-[24px] text-[#EF4444]">
                  {item.foodName}
                </div>
                <div className="font-[600] text-[18px] text-[#09090B]">
                  {item.price}₮
                </div>
              </div>
              <div className="text-[14px] font-[400] text-[#09090B]">
                {item.ingredients}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
