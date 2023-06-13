import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Input from "@/components/Atoms/Input";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { H2 } from "@/common/typography";
import InputDropdown, { OptionType } from "@/components/Atoms/InputDropdown";
import { registerUser } from "@/services/register";
import classNames from "classnames";

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
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email as string);
      formik.setFieldValue("company", router.query.company as string);
    }
  }, [router.query]);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < window.outerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const registerClass = classNames("m-0", { "mt-20": isKeyboardOpen });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      company: "",
      password: "",
      passwordConfirmation: "",
      cluster: { value: "", label: "" },
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
      cluster: Yup.object().shape({
        value: Yup.string().required("Este campo es obligatorio"),
        label: Yup.string().required("Este campo es obligatorio"),
      }),
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
    <div className={registerClass}>
      <form
        onSubmit={formik.handleSubmit}
        className={"flex justify-center flex-col items-cente"}
      >
        <H2 color="text-white">Regístrate</H2>
        <div className={"mt-4"}>
          <Input
            type="string"
            name="firstName"
            label="Escribe tu nombre"
            className="w-72"
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
            type="email"
            name="email"
            placeholder="email@airbus.com"
            label="Escribe tu email"
            className="w-72  mt-4"
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
        <div className={"mt-4"}>
          <RoundedButton type="submit">Enviar</RoundedButton>
        </div>
      </form>
    </div>
  );
}
