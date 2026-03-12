import { CategoryWithCount } from "@/components/admin/food-menu/DishesCategory";

export const fetchCategoriesWithCount = async () => {
  return { data: [] as CategoryWithCount[], error: false };
};
