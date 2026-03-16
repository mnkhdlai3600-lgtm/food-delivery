"use client";

import { updateOrder } from "@/lib/services/update-order";
import { AllFoodOrders, FoodOrderStatusEnum } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { getBorderColor } from "@/lib";

type DeliveryStatusProps = {
  status?: FoodOrderStatusEnum;
  orderId: string;
  setFoodOrdersAction?: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
};

const statusOptions = Object.values(FoodOrderStatusEnum);

const DeliveryStatus = ({
  status,
  orderId,
  setFoodOrdersAction,
}: DeliveryStatusProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentStatus = useMemo(
    () => status ?? FoodOrderStatusEnum.PENDING,
    [status],
  );

  const handleSaveStatus = async (option: FoodOrderStatusEnum) => {
    if (currentStatus === option || loading || !setFoodOrdersAction) return;

    try {
      setLoading(true);

      const updatedOrder = await updateOrder(orderId, { status: option });

      setFoodOrdersAction((prev) => {
        if (!prev) return prev;

        return prev.map((order) =>
          order._id === orderId
            ? { ...order, status: updatedOrder?.status || option }
            : order,
        );
      });

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
          className="flex h-8 cursor-pointer items-center gap-2.5 rounded-full border px-2.5 text-xs font-semibold text-primary"
          style={{ borderColor: getBorderColor(currentStatus) }}
        >
          <p>{currentStatus.toUpperCase()}</p>
          <ChevronsUpDown size={16} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex w-[140px] flex-col p-1" align="start">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            className="flex cursor-pointer items-center rounded-sm p-2 hover:bg-black/15"
            onClick={() => handleSaveStatus(option)}
            disabled={loading}
          >
            <Badge
              variant="secondary"
              className="rounded-full text-xs font-medium"
            >
              {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
            </Badge>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default DeliveryStatus;
