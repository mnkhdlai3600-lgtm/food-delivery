"use client";

import { ChangeEvent, useState } from "react";
import { Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter as AlertFooter,
  AlertDialogHeader,
  AlertDialogTitle as AlertTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { updateFood } from "@/lib/services/update-food";
import { deleteFood } from "@/lib/services/delete-food";
import { uploadImage } from "@/lib/utils/uploadImage";
import { ImageUploader } from "./ImageUploader";

type UpdateFoodModalProps = {
  id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  onSuccess?: () => void | Promise<void>;
};

type FoodInfo = {
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
};

export const UpdateFoodModal = ({
  id,
  foodName,
  price,
  image,
  ingredients,
  onSuccess,
}: UpdateFoodModalProps) => {
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName,
    price: String(price),
    image,
    ingredients,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFoodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    setUploadedImage(event.target.files[0]);
  };

  const handleUpdateFood = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token олдсонгүй");
        return;
      }

      let imageUrl = foodInfo.image;

      if (uploadedImage) {
        const uploadedUrl = await uploadImage(uploadedImage);

        if (!uploadedUrl) {
          setErrorMessage("Зураг upload хийхэд алдаа гарлаа");
          return;
        }

        imageUrl = uploadedUrl;
      }

      const { error } = await updateFood({
        id,
        token,
        foodName: foodInfo.foodName,
        ingredients: foodInfo.ingredients,
        price: parseFloat(foodInfo.price) || 0,
        image: imageUrl,
      });

      if (error) {
        setErrorMessage("Хоол шинэчлэхэд алдаа гарлаа");
        return;
      }

      await onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.error("UPDATE_FOOD_ERROR:", error);
      setErrorMessage("Серверийн алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFood = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Token олдсонгүй");
        return;
      }

      const result = await deleteFood({ id, token });

      if (result.error) {
        setErrorMessage(result.message || "Хоол устгахад алдаа гарлаа");
        return;
      }

      await onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.error("DELETE_FOOD_ERROR:", error);
      setErrorMessage("Серверийн алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-background"
        >
          <Pencil color="#EF4444" />
        </button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 sm:max-w-[425px]">
        <div className="mb-4 flex items-center justify-between">
          <DialogTitle>Update Dish</DialogTitle>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-9 w-9 rounded-full"
            >
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </div>

        <div className="flex w-full gap-6">
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="foodName" className="ml-1 font-semibold">
              Food name
            </Label>
            <Input
              name="foodName"
              placeholder="Type food name..."
              value={foodInfo.foodName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="price" className="font-semibold">
              Food price
            </Label>
            <Input
              name="price"
              type="number"
              placeholder="Enter price..."
              value={foodInfo.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="font-semibold">
            Ingredients
          </Label>
          <Input
            name="ingredients"
            placeholder="List ingredients..."
            value={foodInfo.ingredients}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="font-semibold">
            Food image
          </Label>
          <ImageUploader onFileChange={onFileChange} imgFile={uploadedImage} />
        </div>

        {errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}

        <DialogFooter className="mt-4 flex w-full sm:justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="destructive" disabled={loading}>
                {loading ? "Processing..." : "Delete Dish"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertTitle>Энэ хоолыг устгах уу?</AlertTitle>
                <AlertDialogDescription>
                  Энэ үйлдлийг буцаах боломжгүй. Сонгосон хоол бүр мөсөн устах
                  болно.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertFooter>
                <AlertDialogCancel disabled={loading}>Болих</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(event) => {
                    event.preventDefault();
                    void handleDeleteFood();
                  }}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Устгах"}
                </AlertDialogAction>
              </AlertFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="button" onClick={handleUpdateFood} disabled={loading}>
            {loading ? "Updating..." : "Update Dish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
