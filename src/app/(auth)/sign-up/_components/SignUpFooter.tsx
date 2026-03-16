"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { CardFooter } from "../../../../components/ui/card";

export const SignUpFooter = () => {
  const { push } = useRouter();

  const jumpToLogin = () => {
    push("/login");
  };

  return (
    <CardFooter className="flex flex-col justify-center gap-4 border-t border-slate-100 p-0 pt-6">
      <div className="flex items-center justify-center gap-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?
        </p>
        <Button
          variant="link"
          className="h-auto p-0 text-base font-semibold text-[#2563EB] underline-offset-4 hover:underline"
          onClick={jumpToLogin}
        >
          Login
        </Button>
      </div>
    </CardFooter>
  );
};
