"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllFoodOrders } from "@/types";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  TableMeta,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import TableCustomHeader from "./TableCustomHeader";

type DataTableMeta = TableMeta<AllFoodOrders> & {
  setFoodOrdersAction: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
};

type DataTableProps<TData extends { _id: string }, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setFoodOrdersAction: Dispatch<SetStateAction<AllFoodOrders[] | undefined>>;
};

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
  setFoodOrdersAction,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<TData>({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      rowSelection,
      sorting,
    },
    meta: {
      setFoodOrdersAction,
    } as DataTableMeta,
  });

  const selectedColumnIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="rounded-md border bg-background">
      <TableCustomHeader
        setRowSelection={setRowSelection}
        selectedColumnIds={selectedColumnIds}
        totalOrders={table.getRowCount()}
        tableColumn={table.getColumn("createdAt") as any}
        setFoodOrdersAction={setFoodOrdersAction}
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="h-[52px] bg-accent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-4 text-sm font-medium">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="h-[52px] p-0 text-sm font-medium text-muted-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
