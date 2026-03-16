"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCategory } from "@/lib/services/delete-category";

type Props = {
  categoryId: string;
  categoryName: string;
  refresh: () => void | Promise<void>;
};

export const DeleteCategoryModal = ({
  categoryId,
  categoryName,
  refresh,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteCategory = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token олдсонгүй");
        return;
      }

      const result = await deleteCategory({ categoryId, token });

      if (result.error) {
        setErrorMessage(result.message || "Category устгахад алдаа гарлаа");
        return;
      }

      await refresh();
    } catch (error) {
      console.error("DELETE_CATEGORY_ERROR:", error);
      setErrorMessage("Серверийн алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="h-7 w-7 rounded-full p-0"
          disabled={loading}
        >
          <Trash2 size={14} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Category устгах уу?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-semibold">{categoryName}</span> category-г
            устгавал буцаах боломжгүй.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Болих</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              void handleDeleteCategory();
            }}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Устгах"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
