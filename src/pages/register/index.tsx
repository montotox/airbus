import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Input from "@/components/Atoms/Input";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { H2 } from "@/common/typography";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email as string);
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .matches(
          new RegExp(`@airbus.com$`),
          "El email debe finalizar con @airbus.com"
        )
        .required("Campo requerido"),
      firstName: Yup.string().required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        .required("Campo requerido"),
    }),
    onSubmit: async (data) => {
      console.log(data);
      router.push(`/login?email=${data.email}`);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={"flex justify-center flex-col items-center"}
    >
      <H2 color="text-white">Regístrate</H2>
      <div className={"mt-4"}>
        <Input
          type="email"
          name="email"
          placeholder="email@airbus.com"
          label="Escribe tu email"
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
          type="string"
          name="firstName"
          label="Escribe tu nombre"
          className="w-72 mt-4"
          onChange={(e) => {
            formik.setFieldValue("firstName", e.target.value);
          }}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          error={
            formik.errors.firstName && formik.touched?.firstName
              ? formik.errors.firstName
              : ""
          }
        />
        <Input
          type="password"
          name="password"
          label="Escribe una contraseña"
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
        <Input
          type="password"
          name="passwordConfirmation"
          label="Repite la contraseña"
          className="w-72 mt-4"
          onChange={(e) => {
            formik.setFieldValue("passwordConfirmation", e.target.value);
          }}
          value={formik.values.passwordConfirmation}
          onBlur={formik.handleBlur}
          error={
            formik.errors.passwordConfirmation &&
            formik.touched?.passwordConfirmation
              ? formik.errors.passwordConfirmation
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
