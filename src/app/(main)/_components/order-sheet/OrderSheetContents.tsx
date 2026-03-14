"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderSheetCart, OrderSheetOrders, OrderSheetPayment } from ".";

type OrderSheetContentsProps = {
  openModalAction: () => void;
};

export const OrderSheetContents = ({
  openModalAction,
}: OrderSheetContentsProps) => {
  return (
    <Tabs defaultValue="cart" className="h-full space-y-6">
      <TabsList className="mt-6 w-full rounded-full">
        <TabsTrigger
          value="cart"
          className="w-full rounded-full data-[state=active]:bg-[#EF4444] data-[state=active]:text-white"
        >
          Cart
        </TabsTrigger>

        <TabsTrigger
          value="order"
          className="w-full rounded-full data-[state=active]:bg-[#EF4444] data-[state=active]:text-white"
        >
          Order
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cart">
        <OrderSheetCart />
        <OrderSheetPayment openModalAction={openModalAction} />
      </TabsContent>

      <TabsContent value="order" className="h-full">
        <OrderSheetOrders />
      </TabsContent>
    </Tabs>
  );
};
