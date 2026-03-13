"use client";

import { useEffect, useState } from "react";
import { Category, fetchCategories } from "@/lib/services/get-categories";
import { FoodsWithCategories } from "./FoodsWithCategories";

export const FoodCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchCategories();
      if (error) {
        setLoading(false);
        return;
      }
      console.log(data);
      const actualArray = Array.isArray(data) ? data : (data as any).data;

      setCategories(actualArray || []);
      setLoading(false);

      if (actualArray?.length > 0) {
        setActiveCategory(actualArray[0].categoryName);
      }
    };

    fetchData();
  }, []);

  const handleScrollToCategory = (categoryName: string) => {
    const section = document.getElementById(categoryName);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveCategory(categoryName);
    }
  };

  useEffect(() => {
    if (!categories.length) return;

    const handleScroll = () => {
      let currentCategory = activeCategory;

      for (const category of categories) {
        const section = document.getElementById(category.categoryName);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          currentCategory = category.categoryName;
          break;
        }
      }

      if (currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, activeCategory]);

  if (loading) return <p className="text-white">Loading...</p>;

  if (!categories.length) {
    return <p className="text-white">No categories found</p>;
  }

  return (
    <div>
      <div className="my-8 flex flex-col gap-9">
        <div className="text-3xl font-semibold text-white">Categories</div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => {
            const isActive = activeCategory === category.categoryName;

            return (
              <button
                key={category._id}
                type="button"
                onClick={() => handleScrollToCategory(category.categoryName)}
                className={`flex items-center rounded-full px-5 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-red-500 text-white"
                    : "bg-background text-black hover:bg-red-100"
                }`}
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>
      </div>

      <FoodsWithCategories />
    </div>
  );
};
