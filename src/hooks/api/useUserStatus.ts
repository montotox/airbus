import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useUserStatus = () => {
  const router = useRouter();
  const email = router.query.email as string;
  const company = router.query.company;
  const getEmailStatus = async () => {
    if (email) {
      const response = await fetch(
        `https://prod-api.cclgrn.com/dashboard/api/email/check_validation/?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
