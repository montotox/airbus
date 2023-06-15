import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUserStatus = () => {
  const [dataReceived, setDataReceived] = useState(false);
  const router = useRouter();
  const email = router.query.email;
  const company = router.query.company;
  const getEmailStatus = async () => {
    if (email) {
      const response = await fetch(
        `https://prod.api.cclgrn.com/dashboard/api/email/check_validation/?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = await response.json();
      console.log("HAGO LA LLAMADA");
      console.log(data);
      return data;
    }
  };

  const { isLoading, isError, data } = useQuery(
    ["emailStatus"],
    getEmailStatus,
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    console.log("Se activa useEffect");
    setTimeout(() => {
      setDataReceived(true);
    }, 5000);
  }, []);

  if (dataReceived) {
    console.log("HAY DATA");
    router.push(`/register?email=${email}&company=${company}`);
    // router.push("/login?email=" + email);
  }

  console.log("dataReceived: ", dataReceived);

  return {
    isLoading,
    isError,
    data,
  };
};
export default useUserStatus;
