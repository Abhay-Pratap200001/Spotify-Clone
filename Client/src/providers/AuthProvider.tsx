import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

const updateApiToken = (token: string | null) => {
  if (token) {
    //putting the token into ['Authorization']
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer${token}`;
  } else {
    // if there is no token delete the header ['Authorization']
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken(); //getting token from clerk
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log("erro in AuthProvider in AuthProvider.tsx file", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);


  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );


  return <>{children}</>;
};

export default AuthProvider;
