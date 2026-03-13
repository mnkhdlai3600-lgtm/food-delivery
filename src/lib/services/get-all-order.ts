import { AllFoodOrders } from "@/types";

type FetchAllOrdersResponse = {
  allFoodOrders: AllFoodOrders[];
  error: boolean;
};

export const fetchAllOrders = async (): Promise<FetchAllOrdersResponse> => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/food-carts/get-all-orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    return {
      allFoodOrders: result.data || [],
      error: false,
    };
  } catch (error) {
    console.error("fetchAllOrders error:", error);

    return {
      allFoodOrders: [],
      error: true,
    };
  }
};
