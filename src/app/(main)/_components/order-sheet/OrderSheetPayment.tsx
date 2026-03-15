"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createOrder, formatMoney } from "@/lib";

import { CartContext, UserContext } from "../../context";

type OrderSheetPaymentProps = {
  openModalAction?: () => void;
};

export const OrderSheetPayment = ({
  openModalAction,
}: OrderSheetPaymentProps) => {
  const router = useRouter();
  const { totalPrice, cartData, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const totalPriceWithFee = Number(totalPrice) + 5000;

  const handleCreateOrder = async () => {
    if (!user) {
      toast.error("Та эхлээд нэвтэрнэ үү.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }

    if (cartData.length === 0) {
      toast.error("Таны cart хоосон байна!");
      return;
    }

    const foodOrderItems = cartData.map((item) => ({
      food: item.food._id,
      quantity: item.quantity,
    }));

    const userId = user?._id;

    if (!userId) {
      toast.error("Хэрэглэгчийн ID олдсонгүй. Дахин нэвтэрнэ үү.");
      router.push("/login");
      return;
    }

    const payload = {
      user_id: userId,
      foodOrderitems: foodOrderItems,
    };

    try {
      const result = await createOrder(payload);

      if (result.error) {
        toast.error("Захиалга үүсгэхэд алдаа гарлаа.");
        return;
      }

      toast.success("Захиалга амжилттай үүслээ!");
      clearCart();

      if (typeof openModalAction === "function") {
        openModalAction();
      }
    } catch (error) {
      console.error("Error in handleCreateOrder:", error);
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const formattedTotalPrice = formatMoney(Number(totalPrice));
  const formattedPriceWithFee = formatMoney(totalPriceWithFee);
  const formattedDeliveryFee = formatMoney(5000);

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="font-light text-[#71717A]">Items</p>
          <p className="font-bold">{formattedTotalPrice}₮</p>
        </div>

        <div className="flex justify-between">
          <p className="font-light text-[#71717A]">Shipping</p>
          <p className="font-bold">{formattedDeliveryFee}₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="font-light text-[#71717A]">Total</p>
          <p className="font-bold">{formattedPriceWithFee}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          size="lg"
          className="w-full rounded-full bg-red-500"
          onClick={handleCreateOrder}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
