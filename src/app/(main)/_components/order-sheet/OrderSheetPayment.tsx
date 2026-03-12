import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { SidebarDashLine } from "@/components/icons";
import { useContext } from "react";
import { CartContext, UserContext } from "../../context";
import { createOrder, formatMoney } from "@/lib";
import { toast } from "sonner";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { totalPrice, cartData, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const totalPriceWithFee = Number(totalPrice) + 5000;

  const handleCreateOrder = async () => {
    if (!user) {
      toast.error("Please log in or provide your address to proceed.");
      return;
    }

    if (cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const foodOrderItems = cartData.map((item) => ({
      food: item.food._id,
      quantity: item.quantity,
    }));

    const payload = {
      user_id: user?._id || "",
      foodOrderitems: foodOrderItems,
    };

    try {
      await createOrder(payload);

      toast.success("Order placed successfully!");
      clearCart();
      openModal();
    } catch (error) {
      console.error("Error in handleCreateOrder:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  const formattedTotalPrice = formatMoney(Number(totalPrice));
  const formattedPriceWithFee = formatMoney(Number(totalPriceWithFee));
  const formattedDeliveryFree = formatMoney(0);

  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">{formattedTotalPrice}₮</p>
        </div>

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-bold">{formattedDeliveryFree}₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Total</p>
          <p className="font-bold">{formattedPriceWithFee}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          size="lg"
          className="w-full bg-red-500 rounded-full"
          onClick={handleCreateOrder}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
