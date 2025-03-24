import { H2 } from "@/common/typography";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import Input from "@/components/Atoms/Input";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        .test("email-airbus", "No está permitido ese correo", (value) => {
          if (value && value.toLowerCase() === "external@airbus.com") {
            return false;
          }
          return true;
        })
        .matches(/@airbus.com$/, "El email debe finalizar con @airbus.com")
        .required("Campo requerido"),
      password: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://prod-api.cclgrn.com/api/auth/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formik.values.email,
              password: formik.values.password,
            }),
          }
        ).then((res) => res.json());
        if (response.access) {
          window.location.replace(
            `https://prod-api.cclgrn.com/dashboard/api/email/get_token_info/${response.access}/?format=json`
          );
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error de conexión" + error);
      }
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
        <RoundedButton type="submit" loading={loading}>
          Enviar
        </RoundedButton>
      </div>
    </form>
  );
}
