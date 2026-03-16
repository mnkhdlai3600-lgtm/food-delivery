import { AllFoodOrders } from "@/types";

export const updateOrder = async (
  orderId: string,
  updateData: Partial<AllFoodOrders>,
): Promise<AllFoodOrders | undefined> => {
  const endPoint = `${process.env.NEXT_PUBLIC_API_URL}/food-carts/update-food-cart/${orderId}`;
  const token = localStorage.getItem("token");

  const res = await fetch(endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  console.log("response status:", res.status);

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Failed to update order");
  }

  return JSON.parse(text)?.data;
};
