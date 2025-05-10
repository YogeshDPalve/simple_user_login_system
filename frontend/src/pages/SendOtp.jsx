import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageTitle from "@/components/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSendResetOtpMutation } from "@/features/api/authApi";

const SendOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendResetOtp, { isLoading }] = useSendResetOtpMutation();

  const handleSentOtp = async (e) => {
    try {
      e.preventDefault();
      const data = await sendResetOtp({ email }).unwrap();
      toast.success(data.message || "Otp send successfully");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.log(error);
      toast.error(
        error.data.message || error.data.errors[0].msg || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <PageTitle title={"Reset Password"} />
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forget Password</CardTitle>
              <CardDescription>
                Enter the email below to send otp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSentOtp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="number">Enter emaild</Label>
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" /> Please Wait
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <Link to="/login">
                    <Button variant="link">Back to login</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
