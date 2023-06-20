import useUserStatus from "@/hooks/api/useUserStatus";
import React, { useState } from "react";
import Loader from "@/components/Atoms/Loader";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ButtonVariants } from "@/constants";

export default function Loading() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const router = useRouter();
  const email = router.query.email as string;
  const company = router.query.company;
  useUserStatus();

  const refetch = async () => {
    setLoading2(true);
    const response = await fetch(
      `https://prod.api.cclgrn.com/dashboard/api/email/check_validation/?email=${encodeURIComponent(
        email
      )}`
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
      setLoading2(false);
    }
    return data;
  };

  const resend = async () => {
    setLoading(true);
    await fetch(
      `https://prod.api.cclgrn.com/dashboard/api/email/email_validation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          company: company,
        }),
      }
    ).then(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Loader message="Revisa la bandeja de entrada de tu email, necesitamos confirmar tu cuenta para continuar" />
      <RoundedButton
        variant={ButtonVariants.SECONDARY}
        onClick={resend}
        loading={loading}
      >
        Reenviar email
      </RoundedButton>
      <RoundedButton onClick={refetch} loading={loading2} className="mt-4">
        Mail confirmado
      </RoundedButton>
    </div>
  );
}
