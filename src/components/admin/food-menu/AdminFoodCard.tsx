"use client";

import { UpdateFoodModal } from "./UpdateFood";

type AdminFoodCardProps = {
  id: string;
  image: string;
  foodName: string;
  ingredients: string;
  price: number;
  onSuccess?: () => void | Promise<void>;
};

export const AdminFoodCard = ({
  id,
  image,
  foodName,
  ingredients,
  price,
  onSuccess,
}: AdminFoodCardProps) => {
  return (
    <div className="flex min-w-full flex-col gap-5 rounded-[20px] border border-border bg-background p-4">
      <div
        className="flex h-[129px] w-full items-end justify-end rounded-xl bg-cover bg-center p-5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <UpdateFoodModal
          id={id}
          image={image}
          foodName={foodName}
          ingredients={ingredients}
          price={price}
          onSuccess={onSuccess}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#EF4444]">{foodName}</p>
          <p className="text-xs">₮{price}</p>
        </div>
        <p className="text-xs">{ingredients}</p>
      </div>
    </div>
  );
};
