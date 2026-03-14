"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getOptionStyles } from "@/lib";
import { updateMultipleOrder } from "@/lib/services/update-multiple-order";
import { AllFoodOrders, FoodOrderStatusEnum } from "@/types";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type MultiDeliveryStatusProps = {
  selectedColumnIds: string[];
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  setFoodOrdersAction: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
};

const statusOptions = Object.values(FoodOrderStatusEnum);

const renderSelectedRow = (selectedColumnCount: number) => {
  if (!selectedColumnCount) return null;

  return (
    <Badge className="rounded-full" variant="secondary">
      {selectedColumnCount}
    </Badge>
  );
};

const MultiDeliveryStatus = ({
  selectedColumnIds,
  setRowSelection,
  setFoodOrdersAction,
}: MultiDeliveryStatusProps) => {
  const [statusState, setStatusState] = useState<FoodOrderStatusEnum>(
    FoodOrderStatusEnum.PENDING
  );

  const handleChangeStatus = (status: FoodOrderStatusEnum) => () => {
    setStatusState(status);
  };

  const handleSaveStatus = async () => {
    await updateMultipleOrder(selectedColumnIds, { status: statusState });

    setFoodOrdersAction((prev) =>
      prev?.map((order) => {
        if (selectedColumnIds.includes(order._id)) {
          return { ...order, status: statusState };
        }
        return order;
      })
    );

    setRowSelection({});
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" disabled={!selectedColumnIds.length}>
          Change delivery state {renderSelectedRow(selectedColumnIds.length)}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[364px] gap-6">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="mt-1 text-sm font-medium">
            Change delivery state
          </DialogTitle>

          <DialogClose asChild>
            <Button
              type="button"
              className="-mt-2 h-7 w-7 rounded-full bg-muted px-2 py-2"
              variant="secondary"
            >
              <X size={12} strokeWidth={1.2} className="text-border/" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex justify-between">
          {statusOptions.map((option) => (
            <Button
              key={option}
              onClick={handleChangeStatus(option)}
              variant="secondary"
              className="h-8 w-24 rounded-full text-xs font-medium"
              style={getOptionStyles(statusState, option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>

        <DialogFooter className="w-full">
          <DialogClose asChild>
            <Button
              className="h-8 w-full rounded-full"
              onClick={handleSaveStatus}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultiDeliveryStatus;
