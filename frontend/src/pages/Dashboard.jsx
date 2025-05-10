import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "@/features/api/authApi";
import { toast } from "sonner";
const Dashboard = () => {
  const { name, email } = useSelector((store) => store.auth.user);

  const [trigger, { data, isLoading, error }] = useLazyLogoutQuery(email);
  console.log(data);
  // logout user function
  const handleLogout = () => {
    try {
      trigger();

      if (error) {
        toast.error("Something went wrong! Logout unsuccessful");
        console.log(error);
      }
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center mt-28 space-y-4">
      <h2 className="text-3xl font-bold capitalize">well come back 👋🏼</h2>
      <h2 className="text-blue-400 text-3xl font-bold capitalize"> {name}</h2>
      <Button
        disabled={isLoading}
        className="mt-10 cursor-pointer font-semibold"
        onClick={handleLogout}
      >
        {isLoading ? (
          <>
            Logging Out
            <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            Logout <LogOut />
          </>
        )}
      </Button>
    </div>
  );
};

export default Dashboard;
