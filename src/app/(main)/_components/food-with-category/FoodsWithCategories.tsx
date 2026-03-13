"use client";

import { fetchCategories } from "@/lib/services/get-categories";
import { FoodCard } from "@/components/food";
import { useEffect, useState } from "react";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId?: string | { _id: string };
};

type CategoryWithFoods = {
  _id: string;
  categoryName: string;
  count?: number;
  foodIds: Food[];
};

export const FoodsWithCategories = () => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<
    CategoryWithFoods[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await fetchCategories();

        console.log("categoriesRes:", categoriesRes);

        if (categoriesRes.error) {
          setFoodsWithCategories([]);
          return;
        }

        const categories = (categoriesRes.data || []) as CategoryWithFoods[];

        setFoodsWithCategories(categories);
      } catch (error) {
        console.error("FOODS_WITH_CATEGORIES_ERROR:", error);
        setFoodsWithCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  const nonEmptyCategories = foodsWithCategories.filter(
    (category) => (category.foodIds?.length || 0) > 0,
  );

  if (!nonEmptyCategories.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {nonEmptyCategories.map((category) => (
        <section
          key={category._id}
          id={category.categoryName}
          className="flex flex-col gap-[54px] rounded-xl scroll-mt-28"
        >
          <p className="text-3xl font-semibold text-white">
            {category.categoryName}
          </p>

          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category.foodIds.map((food) => (
              <div key={food._id}>
                <FoodCard
                  foodName={food.foodName}
                  price={food.price}
                  image={food.image}
                  ingredients={food.ingredients}
                  _id={food._id}
                  categoryId={food.categoryId}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
