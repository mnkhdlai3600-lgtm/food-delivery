"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleVerifyEmail } from "@/lib";

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("Имэйлийг баталгаажуулж байна...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Баталгаажуулах token олдсонгүй.");
          setIsLoading(false);
          return;
        }

        const data = await handleVerifyEmail(token);

        if (data?.accessToken) {
          localStorage.setItem("token", data.accessToken);

          localStorage.setItem(
            "user",
            JSON.stringify({
              _id: data?.data?._id || "",
              email: data?.data?.email || "",
              userName: data?.data?.userName || "",
              phoneNumber: data?.data?.phoneNumber,
              user_age: data?.data?.user_age,
              address: data?.data?.address || "",
              role: data?.data?.role || "",
              isVerified: data?.data?.isVerified,
              phone_verified: data?.data?.phone_verified,
            }),
          );
        }

        setMessage(
          "Имэйл амжилттай баталгаажлаа. Нүүр хуудас руу шилжиж байна...",
        );

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error: any) {
        setMessage(error.message || "Имэйл баталгаажуулахад алдаа гарлаа.");
        setIsLoading(false);
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F5] px-4">
      <div className="w-full max-w-md rounded-[24px] bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-[#18181B]">
          Имэйл баталгаажуулалт
        </h1>

        <p className="text-base leading-7 text-[#71717A]">{message}</p>

        {isLoading && (
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-red-500" />
          </div>
        )}
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F4F4F5] px-4">
          <div className="w-full max-w-md rounded-[24px] bg-white p-8 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-[#18181B]">
              Имэйл баталгаажуулалт
            </h1>
            <p className="text-base leading-7 text-[#71717A]">Уншиж байна...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
