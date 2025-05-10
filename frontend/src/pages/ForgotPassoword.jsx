import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useResetPasswordMutation } from "@/features/api/authApi";

const ForgotPassowrd = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      if (!value.trim()) {
        toast.error("OTP fields cannot be empty.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("password and confirm password must be same");
        return;
      }
      const data = await resetPassword({
        email,
        otp: value,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      toast.success(data?.message || "Password Reset Successfully");
      setValue("");
      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          error?.data?.errors[0]?.msg ||
          "Something went wrong"
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
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>
                Enter the OPT below to reset account password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSumbit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Enter OTP</Label>
                    <InputOTP
                      maxLength={6}
                      value={value}
                      onChange={(value) => setValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Reset Password"
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

export default ForgotPassowrd;
