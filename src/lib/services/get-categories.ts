export type Category = {
  categoryName: string;
  _id: string;
};

export const fetchCategories = async (): Promise<{
  data: Category[];
  error: boolean;
}> => {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${api}/food-category/get-category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Алдаа гарлаа");
    }

    const result = await response.json();

    return { data: result, error: false };
  } catch (err) {
    console.error(err);
    return { data: [], error: true };
  }
};
