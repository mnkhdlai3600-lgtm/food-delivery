import { AllFoodOrders } from "@/types";

export const updateOrder = async (
  id: string,
  payload: Partial<AllFoodOrders>
): Promise<AllFoodOrders | undefined> => {
  const endPoint = `/food-order/${id}`;
  const token = localStorage.getItem("token");
  return undefined;
};
