import useUserStatus from "@/hooks/api/useUserStatus";
import React, { useState } from "react";
import Loader from "@/components/Atoms/Loader";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const email = router.query.email;
  const company = router.query.company;
  useUserStatus();

  const refetch = async () => {
    setLoading(true);
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
      toast.error("No se pudo validar tu email", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
    return data;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Loader message="Revisa la bandeja de entrada de tu email, necesitamos validar tu cuenta para continuar" />
      <RoundedButton type="submit" onClick={refetch} loading={loading}>
        Ya validé mi email
      </RoundedButton>
    </div>
  );
}
