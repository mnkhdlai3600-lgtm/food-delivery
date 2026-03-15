export enum FoodOrderStatusEnum {
  PENDING = "pending",
  PREPARING = "preparing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const statusClasses: Record<FoodOrderStatusEnum, string> = {
  [FoodOrderStatusEnum.PENDING]: "border-red-500",
  [FoodOrderStatusEnum.PREPARING]: "border-yellow-500",
  [FoodOrderStatusEnum.COMPLETED]: "border-green-500",
  [FoodOrderStatusEnum.CANCELLED]: "border-border",
};

export enum UserRoleEnum {
  User = "User",
  Admin = "Admin",
}
