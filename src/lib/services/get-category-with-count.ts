import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";

type FetchCategoriesResponse = {
  data: CategoryWithCount[];
  error: boolean;
};

export const fetchCategoriesWithCount =
  async (): Promise<FetchCategoriesResponse> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/food-category/get-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch categories");
      }

      return {
        data: result.data || [],
        error: false,
      };
    } catch (error) {
      console.error("fetchCategoriesWithCount error:", error);
      return {
        data: [],
        error: true,
      };
    }
  };
