import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      const registerData = await registerUser(formData).unwrap();
      toast.success(registerData?.message || "Register Successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.data?.errors[0]?.msg ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <PageTitle title={"Register"} />
      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your details below for registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-3">
                <div className=" grid md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="text">First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="text">Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
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
                    placeholder="****"
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full md:col-span-2"
                  disabled={isLoading}
                  onClick={handleRegistration}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 " /> Please Wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold">
                    Sign in
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

export default Register;
