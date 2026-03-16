import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type BackButton = {
  handleClick: () => void;
};

export const BackButton = ({ handleClick }: BackButton) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className="h-10 w-10 rounded-full border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
};
