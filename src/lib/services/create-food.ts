const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CreateFoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: string;
};

export const createFood = async (body: CreateFoodBody) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/foods/add-new-food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Food нэмэхэд алдаа гарлаа");
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("CREATE_FOOD_ERROR:", error);

    return {
      data: null,
      error,
    };
  }
};
