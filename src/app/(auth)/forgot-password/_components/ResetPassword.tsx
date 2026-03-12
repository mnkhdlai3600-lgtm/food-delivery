"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { handlePasswordReset } from "@/lib";
import { Loader2 } from "lucide-react";

interface ResetPasswordProps {
  token: string;
  email: string;
}

const ResetPassword = ({ token, email }: ResetPasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Нууц үгүүд таарахгүй байна");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      await handlePasswordReset({ token, password });

      alert("Нууц үг амжилттай шинэчлэгдлээ!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle>Шинэ нууц үг тохируулах</CardTitle>
        <CardDescription>
          {email} хаягтай хэрэглэгчийн шинэ нууц үгийг оруулна уу.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Шинэ нууц үг</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Нууц үг давтах</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Нууц үг солих"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
