import { LoginResponse } from "@/constants/auth";

export const getCurrentUser = async (token: string | false | null) => {
  const endPoint = "/auth/get-current-user";
};
