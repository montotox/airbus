import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Input from "@/components/Atoms/Input";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { H2 } from "@/common/typography";
import InputDropdown, { OptionType } from "@/components/Atoms/InputDropdown";
import { registerUser } from "@/services/register";

const optionList = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email as string);
      formik.setFieldValue("company", router.query.company as string);
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      company: "",
      password: "",
      cluster: { value: "", label: "" },
      terms: false,
      newsletter: false,
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
      cluster: Yup.object().shape({
        value: Yup.string().required("Este campo es obligatorio"),
        label: Yup.string().required("Este campo es obligatorio"),
      }),
      terms: Yup.boolean().oneOf(
        [true],
        "Debes aceptar los términos y condiciones"
      ),
    }),
    onSubmit: async (data) => {
      try {
        await registerUser(data);
      } catch (error) {
        console.log("Error de conexión", error);
      }
      router.push(`/login?email=${data.email}`);
    },
  });

  const onChangeSelected = (
    option: string | OptionType | null,
    name: string
  ) => {
    formik.setFieldValue(name, option);
  };

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
        <InputDropdown
          optionList={optionList}
          name="cluster"
          valueSelected={formik.values.cluster}
          onChangeSelect={onChangeSelected}
          type="string"
          label="Selecciona tu sede"
          className="w-72 mt-4"
          onBlur={formik.handleBlur}
          error={
            formik.errors.cluster && formik.touched?.cluster
              ? formik.errors.cluster.label
              : ""
          }
          isClearable
          placeholder="Elige una opción"
        />
      </div>
      <div className="flex justify-center flex-col items-center mt-4 w-72">
        <label>
          <input
            name="terms"
            type="checkbox"
            checked={formik.values.terms}
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.checked)
            }
          />
          <span className="ml-2">
            He leído y acepto las{" "}
            <a href="https://www.ciclogreen.com/terms" target="_blank">
              Condiciones Particulares de Registro en Ciclogreen
            </a>
          </span>
        </label>
        {formik.errors.terms && formik.touched?.terms && (
          <span className="text-red-500 text-sm">{formik.errors.terms}</span>
        )}
        <label className="mt-2">
          <input
            name="newsletter"
            type="checkbox"
            checked={formik.values.newsletter}
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.checked)
            }
          />
          <span className="ml-2">
            Deseo estar inscrito en la Newsletter de Ciclogreen y recibir
            comunicaciones comerciales por medios electrónicos
          </span>
        </label>
      </div>
      <div className={"mt-4"}>
        <RoundedButton type="submit">Regístrate ahora</RoundedButton>
      </div>
    </form>
  );
}
