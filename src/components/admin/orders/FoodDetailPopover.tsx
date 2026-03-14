"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FoodOrderItem } from "@/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

type FoodDetailPopoverProps = {
  foodOrderItems: FoodOrderItem[];
};

const isSingleFood = (count: number) => {
  if (count === 1) return `${count} food`;
  return `${count} foods`;
};

const FoodDetailPopover = ({ foodOrderItems }: FoodDetailPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="flex h-full w-40 items-center justify-between border-none bg-inherit px-4 shadow-none"
      >
        <Button
          variant="outline"
          className="border-none p-0 shadow-none hover:bg-inherit"
        >
          <h1>{isSingleFood(foodOrderItems.length)}</h1>
          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        alignOffset={-16}
        className="flex flex-col gap-3"
      >
        {foodOrderItems.map((item, index) => {
          const food = item.food;

          if (!food) {
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-sm text-red-500"
              >
                <div className="h-8 w-8 rounded-sm bg-gray-200" />
                <h1 className="w-[171px]">Food мэдээлэл олдсонгүй</h1>
                <h1>{`x ${item.quantity}`}</h1>
              </div>
            );
          }

          return (
            <div
              key={food._id ?? index}
              className="flex items-center gap-2.5 text-sm"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-sm bg-gray-200">
                <Image
                  src={food.image || "/placeholder-food.png"}
                  fill
                  className="object-cover"
                  alt={food.foodName || "food-image"}
                />
              </div>

              <h1 className="w-[171px]">{food.foodName || "Unknown food"}</h1>
              <h1>{`x ${item.quantity}`}</h1>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default FoodDetailPopover;
