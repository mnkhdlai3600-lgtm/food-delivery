import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, MapPin, X } from "lucide-react";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { UserContext } from "../../context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateCurrentUser } from "@/lib";
import { toast } from "sonner";

export const HeaderAddressSelectButton = () => {
  const { user, setUser } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(user?.address || "");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const handleAddressChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setUserLocation(event.target.value);
  };

  const handleUserAddressUpdate = async () => {
    await updateCurrentUser({ address: userLocation });
    setUser((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        address: userLocation,
      };
    });
    toast.success(`Address updated successfully`);
    setAddressDialogOpen(false);
  };

  const handleUserAddressClear: MouseEventHandler<SVGSVGElement> = async (
    event
  ) => {
    event.stopPropagation();
    await updateCurrentUser({ address: "" });
    setUserLocation("");
    setUser((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        address: "",
      };
    });
    toast.success(`Address cleared.`);
  };

  const getUserAddress = () => {
    if (user?.address)
      return (
        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-black truncate w-52 text-start">
            {user?.address}
          </p>
          <X
            className="z-50 text-black/50"
            onClick={handleUserAddressClear}
            size={16}
          />
        </div>
      );
    return (
      <div className="flex items-center justify-between w-full text-sm">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[#EF4444]">Delivery address:</p>
          <p className="text-muted-foreground">Add Location</p>
        </div>
        <ChevronRight color="#71717A" size={16} />
      </div>
    );
  };

  const textAreaPlaceholder =
    "Please provide specific address details such as building number, entrance, and apartment number";

  return (
    <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
      <DialogTrigger className="flex items-center h-full gap-1 px-3 py-2 transition-colors bg-white rounded-full cursor-pointer w-72 hover:bg-white/90">
        <MapPin color="#EF4444" size={20} />
        <div className="flex items-center w-full gap-1">{getUserAddress()}</div>
      </DialogTrigger>
      <DialogContent className="w-[480px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="mt-1 text-lg font-semibold">
            Delivery address
          </DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              className="px-2 py-2 -mt-2 rounded-full bg-muted w-7 h-7"
              variant="secondary"
            >
              <X size={12} strokeWidth={1.2} className="text-border/" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <Textarea
            placeholder={textAreaPlaceholder}
            className="min-h-28"
            value={userLocation}
            onChange={handleAddressChange}
          />
        </div>
        <DialogFooter className="pt-6">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUserAddressUpdate} disabled={!userLocation}>
            Deliver here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
