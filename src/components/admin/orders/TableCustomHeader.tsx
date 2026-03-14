"use client";

import { AllFoodOrders } from "@/types";
import { Column } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import MultiDeliveryStatus from "./MultiDeliveryStatus";
import { TableRangeSelector } from "./TableRangeSelector";

type TableCustomHeaderProps<TData> = {
  setFoodOrdersAction: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  totalOrders: number;
  tableColumn: Column<TData, unknown> | undefined;
  selectedColumnIds: string[];
};

const TableCustomHeader = <TData,>({
  setFoodOrdersAction,
  totalOrders,
  setRowSelection,
  selectedColumnIds,
  tableColumn,
}: TableCustomHeaderProps<TData>) => {
  return (
    <div className="flex h-[76px] w-full justify-between p-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-foreground">Orders</h1>
        <p className="text-xs text-muted-foreground">{totalOrders} items</p>
      </div>

      <div className="flex gap-3">
        <TableRangeSelector tableColumn={tableColumn} />

        <MultiDeliveryStatus
          setRowSelection={setRowSelection}
          selectedColumnIds={selectedColumnIds}
          setFoodOrdersAction={setFoodOrdersAction}
        />
      </div>
    </div>
  );
};

export default TableCustomHeader;
