"use client";

import { FoodCategory } from "@/components/admin/food-menu/AdminFoodsSection";
import { FoodCard } from "@/components/food";
import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { useEffect, useState } from "react";

export const FoodsWithCategories = () => {
  const [foodsWithCategories, setFoodsWithCategories] = useState<
    FoodCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchFoodsWithCategories();
      if (error) {
        setLoading(false);
        return;
      }
      console.log(data);
      const actualArray = Array.isArray(data) ? data : (data as any).data;

      setFoodsWithCategories(actualArray || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  const nonEmptyCategories = foodsWithCategories.filter(
    (category: any) => category?.foodIds?.length > 0,
  );

  if (!nonEmptyCategories.length) return null;

  return (
    <div className="flex flex-col gap-6">
      {nonEmptyCategories.map((category: any, index) => (
        <section
          key={category._id || index}
          id={category.categoryName}
          className="flex flex-col gap-[54px] rounded-xl scroll-mt-28"
        >
          <p className="text-3xl font-semibold text-white">
            {category?.categoryName}
          </p>
          <div className="grid grid-cols-1 mb-5 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {category?.foodIds?.map((food: any) => (
              <div key={food?._id}>
                <FoodCard
                  foodName={food?.name}
                  price={food?.price}
                  image={food?.image}
                  ingredients={food?.ingredients}
                  _id={food?._id}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
