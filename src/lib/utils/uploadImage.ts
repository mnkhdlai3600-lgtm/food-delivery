export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.url || null;
  } catch (error) {
    console.error("UPLOAD_IMAGE_ERROR:", error);
    return null;
  }
};
