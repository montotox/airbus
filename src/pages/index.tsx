import { useEffect, useState } from "react";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import Input from "@/components/Atoms/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const company = router.query.company;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string()
    //     .email("Email inválido")
    //     .matches(
    //       new RegExp(`@airbus.com$`),
    //       "El email debe finalizar con @airbus.com"
    //     )
    //     .required("Campo requerido"),
    // }),
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://prod.api.cclgrn.com/dashboard/api/email/email_validation/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formik.values.email,
              company,
            }),
          }
        ).then((res) => res.json());
        if (response.email_validated) {
          if (response.user_exists) {
            router.push(
              `/login?email=${formik.values.email}&company=${company}`
            );
          } else {
            router.push(
              `/register?email=${formik.values.email}&company=${company}`
            );
          }
        } else {
          router.push(
            `/loading?email=${data.email}&company=${router.query.company}`
          );
        }
      } catch (error) {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className={"flex justify-center flex-col items-center"}
      >
        <div className={"mt-4"}>
          <Input
            type="email"
            name="email"
            placeholder="email@airbus.com"
            label="Escribe tu email"
            className="w-72"
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            error={
              formik.errors.email && formik.touched?.email
                ? formik.errors.email
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
    </>
  );
}
