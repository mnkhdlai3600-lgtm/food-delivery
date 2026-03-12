const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchFoodsWithCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/food-category/get-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Foods with categories авахад алдаа гарлаа",
      );
    }

    return {
      data: result.data || [],
      error: null,
    };
  } catch (error) {
    console.error("FETCH_FOODS_WITH_CATEGORIES_ERROR:", error);

    return {
      data: [],
      error,
    };
  }
};
