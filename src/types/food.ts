export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId?: string | { _id: string };
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
