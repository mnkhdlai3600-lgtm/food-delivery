"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { useEffect, useState } from "react";
import { handleGetCurrentUser } from "@/lib";

export const OrderSheetOrders = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await handleGetCurrentUser();
        const currentUser = data.data || data.user;

        setAddress(currentUser?.address || "");
      } catch (error) {
        console.error("Current user авахад алдаа", error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <OrderSheetOrderItem address={address} />
      </CardContent>
    </Card>
  );
};
