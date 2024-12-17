import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/actions/getUser.action";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const useUser = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.getMe.user) {
      setUser(data?.getMe.user);
    }
  }, [data]);

  const logout = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    setUser(null);
    redirect("/auth/signin");
  };

  const handleRefetch = async () => {
    await refetch();
    if (data?.getMe.user) {
      setUser(data?.getMe.user);
    }
  };

  return {
    user,
    loading,
    error,
    logout,
    refetch: handleRefetch,
  };
};

export default useUser;
