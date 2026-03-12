"use client";

import { Pencil } from "lucide-react";

type AdminFoodCardProps = {
  image: string;
  foodName: string;
  ingredients: string;
  price: number;
};

export const AdminFoodCard = ({
  image,
  foodName,
  ingredients,
  price,
}: AdminFoodCardProps) => {
  return (
    <div className="flex min-w-full flex-col gap-5 rounded-[20px] border border-border bg-background p-4">
      <div
        className="flex h-[129px] w-full items-end justify-end rounded-xl bg-cover bg-center p-5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-background"
        >
          <Pencil color="#EF4444" />
        </button>
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
