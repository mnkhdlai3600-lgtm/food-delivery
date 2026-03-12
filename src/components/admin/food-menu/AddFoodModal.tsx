"use client";

import { Plus, X } from "lucide-react";
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
import { createFood } from "@/lib/services/create-food";
import { ChangeEvent, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { uploadImage } from "@/lib/utils/uploadImage";

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
  onSuccess?: () => void | Promise<void>;
};

type FoodInfo = {
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  categoryId: string;
};

export const AddFoodModal = ({
  categoryName,
  categoryId,
  onSuccess,
}: AddFoodModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    categoryId: categoryId,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFoodInfo((prevFoodInfo) => ({
      ...prevFoodInfo,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFoodInfo({
      foodName: "",
      price: "",
      image: "",
      ingredients: "",
      categoryId: categoryId,
    });
    setUploadedImage(undefined);
  };

  const handleCreateFood = async () => {
    try {
      setLoading(true);

      const foodData = {
        ...foodInfo,
        price: parseFloat(foodInfo.price) || 0,
      };

      let imageUrl: string = foodInfo.image;

      const file = uploadedImage;
      if (file) {
        const uploadedUrl = await uploadImage(file);

        if (!uploadedUrl) {
          console.error("IMAGE_UPLOAD_ERROR");
          return;
        }

        imageUrl = uploadedUrl;
      }

      const { error } = await createFood({
        ...foodData,
        image: imageUrl,
      });

      if (error) {
        console.error(error);
        return;
      }

      resetForm();
      await onSuccess?.();
    } catch (error) {
      console.error("CREATE_FOOD_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    setUploadedImage(event.target.files[0]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border m-1 flex h-[227px] flex-col items-center justify-center gap-6 rounded-3xl bg-background">
          <Button type="button" className="h-9 w-9 rounded-full bg-red-500">
            <Plus width={16} height={16} strokeWidth={1} />
          </Button>
          <p className="w-36 text-center text-sm">
            Add new Dish to {categoryName}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 sm:max-w-[425px]">
        <div className="mb-4 flex items-center justify-between">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="mt-4"
              onClick={handleCreateFood}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Dish"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
