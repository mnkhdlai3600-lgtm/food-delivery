import { User } from "@/constants/auth";

export const updateCurrentUser = async (
  payload: Partial<User>,
): Promise<User | undefined> => {
  const endPoint = `/auth`;
  const token = localStorage.getItem("token");
  return undefined;
};
