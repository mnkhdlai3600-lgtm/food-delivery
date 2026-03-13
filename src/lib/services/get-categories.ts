const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Category = {
  _id: string;
  categoryName: string;
  foodIds?: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    categoryId: string;
  }[];
  count?: number;
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/food-category/get-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Categories авахад алдаа гарлаа");
    }

    return {
      data: result.data || [],
      error: null,
    };
  } catch (error) {
    console.error("FETCH_CATEGORIES_ERROR:", error);

    return {
      data: [],
      error,
    };
  }
};
