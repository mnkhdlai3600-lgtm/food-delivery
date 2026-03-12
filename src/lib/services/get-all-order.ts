const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetchAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/food-carts/get-all-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Захиалгууд авахад алдаа гарлаа");
    }

    return {
      allFoodOrders: result?.allFoodOrders || result?.data || [],
      error: null,
    };
  } catch (error) {
    console.error("FETCH_ALL_ORDERS_ERROR:", error);

    return {
      allFoodOrders: [],
      error,
    };
  }
};
