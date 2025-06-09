"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/user";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const errMsg = (await logoutAction())?.errorMessage;

    if (errMsg) {
      toast.error(errMsg);
    } else {
      toast.success("You have been successfully cooked");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="w-24">
      {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
};

export default LogOutButton;
