"use client";

import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { AddFoodModal } from "./AddFoodModal";

export type FoodCategory = {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
  foodIds: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
  }[];
};

export const AdminFoodsSection = () => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<
    FoodCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  const getFoods = async () => {
    try {
      setLoading(true);

      const { data, error } = await fetchFoodsWithCategories();

      if (error) {
        console.error(error);
        return;
      }

      console.log("FOODS RESPONSE:", data);
      setFoodsWithCategories(data || []);
    } catch (error) {
      console.error("FETCH_ADMIN_FOODS_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (loading) return <AdminFoodSkeleton />;

  if (!foodsWithCategories.length) {
    return <div className="p-6">Өгөгдөл алга байна.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {foodsWithCategories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col gap-4 rounded-xl bg-background p-6"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>
            <p className="flex items-center">{category.foodIds?.length || 0}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
              onSuccess={getFoods}
            />

            {category.foodIds?.map((food) => (
              <div key={food._id} className="flex gap-2">
                <AdminFoodCard
                  id={food._id}
                  image={food.image}
                  price={food.price}
                  ingredients={food.ingredients}
                  foodName={food.foodName}
                  onSuccess={getFoods}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
