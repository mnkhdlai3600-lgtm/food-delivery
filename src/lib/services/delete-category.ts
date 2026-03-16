export const deleteCategory = async ({
  categoryId,
  token,
}: {
  categoryId: string;
  token: string;
}) => {
  try {
    if (!categoryId) {
      return { error: true, message: "Category id олдсонгүй" };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return { error: true, message: "NEXT_PUBLIC_API_URL олдсонгүй" };
    }

    const endPoint = `${apiUrl}/food-category/delete-category/${categoryId}`;

    const res = await fetch(endPoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    if (!res.ok) {
      return {
        error: true,
        message: text || `Delete failed: ${res.status}`,
      };
    }

    let data: unknown = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    return {
      error: false,
      data,
    };
  } catch (error) {
    console.error("DELETE_CATEGORY_SERVICE_ERROR:", error);
    return {
      error: true,
      message: "Server error",
    };
  }
};
