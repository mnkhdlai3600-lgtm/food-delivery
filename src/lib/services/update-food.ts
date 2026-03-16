const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UpdateFoodParams = {
  id: string;
  token: string;
  foodName: string;
  ingredients: string;
  price: number;
  image: string;
};

export const updateFood = async ({
  id,
  token,
  foodName,
  ingredients,
  price,
  image,
}: UpdateFoodParams) => {
  try {
    const response = await fetch(`${API_URL}/foods/update-food/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        foodName,
        ingredients,
        price,
        image,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Хоол шинэчлэхэд алдаа гарлаа");
    }

    return {
      data: result.food,
      error: null,
    };
  } catch (error) {
    console.error("UPDATE_FOOD_ERROR:", error);

    return {
      data: null,
      error,
    };
  }
};
