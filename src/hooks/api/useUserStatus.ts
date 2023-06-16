import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useUserStatus = () => {
  const [dataReceived, setDataReceived] = useState(false);
  const router = useRouter();
  const email = router.query.email;
  const company = router.query.company;
  const getEmailStatus = async () => {
    if (email) {
      const response = await fetch(
        "https://prod.api.cclgrn.com/dashboard/api/email/email_validation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: router.query.email,
            company: router.query.company,
          }),
        }
      );
      const data = await response.json();
      if (data.email_validated) {
        if (data.user_exists) {
          router.push(`/login?email=${email}&company=${company}`);
        } else {
          router.push(`/register?email=${email}&company=${company}`);
        }
      } else {
        return data;
      }
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

  return {
    isLoading,
    isError,
    data,
  };
};
export default useUserStatus;
