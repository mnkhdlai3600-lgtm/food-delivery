"use client";

import { updateOrder } from "@/lib/services/update-order";
import { AllFoodOrders, FoodOrderStatusEnum } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { getBorderColor } from "@/lib";

type DeliveryStatusProps = {
  status: FoodOrderStatusEnum;
  orderId: string;
  setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[]>>;
};

const statusOptions = Object.values(FoodOrderStatusEnum);

const DeliveryStatus = ({
  status,
  orderId,
  setFoodOrders,
}: DeliveryStatusProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveStatus = async (option: FoodOrderStatusEnum) => {
    if (status === option || loading) return;

    try {
      setLoading(true);

      const updatedOrder = await updateOrder(orderId, { status: option });

      setFoodOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder?.status || option }
            : order,
        ),
      );

      setPopoverOpen(false);
    } catch (error) {
      console.error("Status update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="border rounded-full px-2.5 flex items-center text-primary h-8 text-xs font-semibold gap-2.5 cursor-pointer"
          style={{ borderColor: getBorderColor(status) }}
        >
          <p>{status.toUpperCase()}</p>
          <ChevronsUpDown size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col p-1 w-[140px]" align="start">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            className="flex items-center p-2 rounded-sm cursor-pointer hover:bg-black/15"
            onClick={() => handleSaveStatus(option)}
          >
            <Badge
              variant="secondary"
              className="text-xs font-medium rounded-full"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Badge>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DeliveryStatus;
