"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FoodDetailModal } from "./FoodDetailModal";
import { MouseEventHandler, useContext, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CartContext } from "@/app/(main)/context";
import { AddToCartAlert } from "./AddToCartAlert";
import { formatMoney } from "@/lib";

type FoodCardProps = {
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  _id: string;
  categoryId?: string | { _id: string };
};

export const FoodCard = ({
  foodName,
  price,
  ingredients,
  image,
  _id,
  categoryId,
}: FoodCardProps) => {
  const { addItem } = useContext(CartContext);

  const food = { _id, foodName, price, ingredients, image, categoryId };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const formattedPrice = formatMoney(price);

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    addItem({
      food: { _id, foodName, price, ingredients, image, categoryId },
      quantity: 1,
    });

    setShowAlert(true);
  };

  const handleAlertRemove = () => {
    setShowAlert(false);
  };

  return (
    <div className="w-full">
      <div onClick={onToggleModal}>
        <Card className="group flex flex-col gap-4 p-4 bg-white border-none shadow-none cursor-pointer rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="relative w-full h-52 overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt={foodName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <Button
              className="absolute bottom-4 right-4 h-11 w-11 rounded-full bg-white transition-transform duration-300 group-hover:scale-110"
              onClick={handleAddToCart}
              type="button"
            >
              <Plus color="red" />
            </Button>
          </div>

          <div className="w-full">
            <div className="flex justify-between gap-3">
              <p className="text-2xl font-semibold text-red-500 line-clamp-2">
                {foodName}
              </p>

              <p className="shrink-0 text-lg font-semibold text-[#09090B]">
                {formattedPrice} ₮
              </p>
            </div>

            <div className="mt-2 text-sm font-normal line-clamp-2 text-[#09090B]">
              {ingredients}
            </div>
          </div>
        </Card>
      </div>

      <FoodDetailModal
        food={food}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />

      <AddToCartAlert isVisible={showAlert} onHide={handleAlertRemove} />
    </div>
  );
};
