import { useEffect, useState } from "react";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import Input from "@/components/Atoms/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Loader from "@/components/Atoms/Loader";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    getCompanyData();
  }, []);

  const getCompanyData = async () => {
    try {
      const response = await fetch(
        `https://prod.api.cclgrn.com/dashboard/api/companyinfo/?company=${router.query.company}`
      );
      setCompanyData(response);
    } catch (error) {}
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .matches(
          new RegExp(`@airbus.com$`),
          "El email debe finalizar con @airbus.com"
        )
        .required("Campo requerido"),
    }),
    onSubmit: async (data) => {
      router.push(`/loading?email=${data.email}`);
    },
  });

  return (
    <>
      {loading ? (
        <Loader message="Aguarda un instante..." />
      ) : (
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
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
                setEmail(e.target.value);
              }}
              value={email}
              onBlur={formik.handleBlur}
              error={
                formik.errors.email && formik.touched?.email
                  ? formik.errors.email
                  : ""
              }
            />
          </div>
          <div className={"mt-4"}>
            <RoundedButton type="submit">Enviar</RoundedButton>
          </div>
        </form>
      )}
    </>
  );
}
