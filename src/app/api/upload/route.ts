import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Файл олдсонгүй." },
        { status: 400 },
      );
    }

    console.log("UPLOAD_FILE_NAME:", file.name);
    console.log("UPLOAD_FILE_TYPE:", file.type);
    console.log("UPLOAD_FILE_SIZE:", file.size);
    console.log("HAS_BLOB_TOKEN:", Boolean(process.env.BLOB_READ_WRITE_TOKEN));

    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("UPLOAD_ROUTE_ERROR_FULL:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Зураг upload хийхэд алдаа гарлаа.",
      },
      { status: 500 },
    );
  }
}
