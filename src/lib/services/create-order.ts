const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FoodOrderItem = {
  food: string;
  quantity: number;
};

type CreateFoodCartBody = {
  user_id: string;
  foodOrderitems: FoodOrderItem[];
};

export const createOrder = async (body: CreateFoodCartBody) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/food-carts/create-food-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Захиалга үүсгэхэд алдаа гарлаа");
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error("CREATE_ORDER_ERROR:", error);

    return {
      data: null,
      error,
    };
  }
};
