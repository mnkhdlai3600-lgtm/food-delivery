"use client";

import { fetchCategoriesWithCount } from "@/lib";
import { useEffect, useState } from "react";
import { DishesCategorySkeleton } from "./DishesCategorySkeleton";
import { AddCategoryModal } from "./AddCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategory";

export type CategoryWithCount = {
  _id: string;
  categoryName: string;
  count: number;
};

export const DishesCategory = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCategoriesWithCount();
      setCategories(data || []);
      console.log(data);
    } catch (error) {
      console.error(error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  if (loading) return <DishesCategorySkeleton />;

  const allDishesCount = categories.reduce(
    (acc, category) => acc + (Number(category.count) || 0),
    0,
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background p-6">
      <p className="text-xl font-semibold">Dishes category</p>

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2 rounded-full border px-4 py-2">
          <p className="text-sm font-medium">All dishes</p>
          <p className="flex items-center rounded-full bg-black px-2 py-[2px] text-xs font-semibold text-white">
            {allDishesCount}
          </p>
        </div>

        {categories.map((category) => (
          <div
            key={category._id}
            className="flex h-10 items-center gap-2 rounded-full border border-border bg-white px-3"
          >
            <p className="whitespace-nowrap text-sm font-medium text-foreground">
              {category.categoryName}
            </p>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-semibold leading-none text-white">
              {Number(category.count) || 0}
            </span>

            <DeleteCategoryModal
              categoryId={category._id}
              categoryName={category.categoryName}
              refresh={fetchData}
            />
          </div>
        ))}

        <AddCategoryModal refresh={fetchData} />
      </div>
    </div>
  );
};
