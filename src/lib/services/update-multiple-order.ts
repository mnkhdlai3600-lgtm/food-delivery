import { AllFoodOrders } from "@/types";

export const updateMultipleOrder = async (
  ids: string[],
  updateData: Partial<AllFoodOrders>
): Promise<AllFoodOrders | undefined> => {
  const endPoint = `/food-order`;
  const token = localStorage.getItem("token");
  return undefined;
};
