export const deleteFood = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    if (!id) {
      return { error: true, message: "Food id олдсонгүй" };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return { error: true, message: "NEXT_PUBLIC_API_URL олдсонгүй" };
    }

    const endPoint = `${apiUrl}/foods/delete-food/${id}`;
    console.log("DELETE endpoint:", endPoint);

    const res = await fetch(endPoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    console.log("DELETE status:", res.status);
    console.log("DELETE text:", text);

    if (!res.ok) {
      return {
        error: true,
        message: `Delete failed: ${res.status}`,
      };
    }

    try {
      return {
        error: false,
        data: JSON.parse(text),
      };
    } catch {
      return {
        error: false,
        data: text,
      };
    }
  } catch (error) {
    console.error("DELETE_FOOD_SERVICE_ERROR:", error);
    return {
      error: true,
      message: "Server error",
    };
  }
};
