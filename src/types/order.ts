import { FoodOrderStatusEnum } from "./common";
import { Food } from "./food";

export type FoodOrderItem = {
  quantity: number;
  food: Food;
};

export type OrderUser = {
  _id: string;
  email?: string;
  address?: string;
};

export type AllFoodOrders = {
  _id: string;
  user_id?: OrderUser;
  foodOrderitems: FoodOrderItem[];
  totalPrice: number;
  status: FoodOrderStatusEnum;
  createdAt: string;
  updatedAt?: string;
};

export type FoodOrder = {
  total: number;
  allFoodOrders: AllFoodOrders[];
};
