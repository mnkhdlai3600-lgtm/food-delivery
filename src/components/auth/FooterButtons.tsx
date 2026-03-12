"use client";
import { Button } from "../ui/button";

type FooterButtonsProps = {
  buttonDisable?: boolean;
  buttonText: string;
  handleClick?: () => void;
};

export const FooterButtons = ({
  buttonDisable,
  buttonText,
  handleClick,
}: FooterButtonsProps) => {
  return (
    <div className="w-full">
      <Button
        type="submit"
        className="w-full"
        disabled={buttonDisable}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
