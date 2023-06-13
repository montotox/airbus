import useUserStatus from "@/hooks/api/useUserStatus";
import React from "react";
import Loader from "@/components/Atoms/Loader";

export default function Loading() {
  useUserStatus();

  return (
    <Loader message="Revisa tu email, esperamos la validación para continuar..." />
  );
}
