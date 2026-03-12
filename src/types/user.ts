import { UserRoleEnum } from "./common";
import { FoodOrder } from "./order";

type User = {
  email?: string;
  userName?: string;
  phoneNumber?: number;
  user_age?: number;
  address?: string;
  isVerified?: boolean;
  phone_verified?: boolean;
  role?: string;
};
