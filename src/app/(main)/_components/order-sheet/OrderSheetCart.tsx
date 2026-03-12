import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { useContext } from "react";
import { CartContext } from "../../context";

export const OrderSheetCart = () => {
  const { cartData } = useContext(CartContext);
  const renderFoodCard = () => {
    if (cartData?.length) {
      return cartData?.map((item) => {
        return (
          <OrderSheetFoodItem
            key={item.food._id}
            food={item.food}
            quantity={item.quantity}
          />
        );
      });
    }
    return <OrderSheetEmptyCard />;
  };

  return (
    <Card className="h-[400px] overflow-hidden pb-4">
      <CardHeader className="p-4">
        <CardTitle>My cart</CardTitle>
      </CardHeader>

      <CardContent className="h-full p-4 pb-10 overflow-scroll">
        {renderFoodCard()}
      </CardContent>
    </Card>
  );
};
