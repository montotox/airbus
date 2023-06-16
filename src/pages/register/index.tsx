import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Input from "@/components/Atoms/Input";
import RoundedButton from "@/components/Atoms/Buttons/RoundedButton/RoundedButton";
import { H2 } from "@/common/typography";
import InputDropdown, { OptionType } from "@/components/Atoms/InputDropdown";
import { registerRequest } from "@/models/register";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const [optionList, setOptionList] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (router.query.email) {
      formik.setFieldValue("email", router.query.email as string);
      formik.setFieldValue("company", router.query.company as string);
      fetchSubgroups();
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      company: "",
      password: "",
      subgroup: { value: "", label: "" },
      terms: false,
      companyTerms: false,
      newsletter: false,
      conditions: true,
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
      subgroup: Yup.object().shape({
        value: Yup.string().required("Este campo es obligatorio"),
        label: Yup.string().required("Este campo es obligatorio"),
      }),
      terms: Yup.boolean().oneOf(
        [true],
        "Debes aceptar los términos y condiciones"
      ),
      companyTerms: Yup.boolean().oneOf(
        [true],
        "Debes aceptar los términos legales de Airbus"
      ),
    }),
    onSubmit: async (data) => {
      const apiFormatData = registerRequest(data);
      try {
        setLoading(true);
        const response = await fetch(
          "https://prod.api.cclgrn.com/dashboard/api/email/create_user/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiFormatData),
          }
        ).then((res) => res.json());
        if (response.token) {
          window.location.replace(
            `https://prod.api.cclgrn.com/dashboard/api/email/get_token_info/${response.token}/?format=json`
          );
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error de conexión" + error);
      }
    },
  });

  const onChangeSelected = (
    option: string | OptionType | null,
    name: string
  ) => {
    formik.setFieldValue(name, option);
  };

  const fetchSubgroups = async () => {
    try {
      const response = await fetch(
        `https://prod.api.cclgrn.com/dashboard/api/email/get_company_info/?company_id=${router.query.company}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      const subgroups = response?.subgroups?.map((subgroup: any) => ({
        value: subgroup.uuid,
        label: subgroup.name,
      }));
      setOptionList(subgroups);
    } catch (error) {
      console.log("Error de conexión", error);
    }
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
          name="subgroup"
          valueSelected={formik.values.subgroup}
          onChangeSelect={onChangeSelected}
          type="string"
          label="Selecciona tu sede"
          className="w-72 mt-4"
          onBlur={formik.handleBlur}
          error={
            formik.errors.subgroup && formik.touched?.subgroup
              ? formik.errors.subgroup.label
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
              <u>Condiciones Particulares de Registro en Ciclogreen</u>
            </a>
          </span>
        </label>
        {formik.errors.terms && formik.touched?.terms && (
          <span className="text-red-400 text-sm">{formik.errors.terms}</span>
        )}
        <label className=" mt-4">
          <input
            name="companyTerms"
            type="checkbox"
            checked={formik.values.companyTerms}
            onChange={(e) =>
              formik.setFieldValue(e.target.name, e.target.checked)
            }
          />
          <span className="ml-2">
            He leído y acepto las{" "}
            <a
              href="https://ciclofargate-staticsfilesbucket-11a3qmi5fai9p.s3.eu-west-3.amazonaws.com/companies/airbus/termandconditions.html"
              target="_blank"
            >
              <u>Condiciones Legales de Airbus</u>
            </a>
          </span>
        </label>
        {formik.errors.companyTerms && formik.touched?.companyTerms && (
          <span className="text-red-400 text-sm">
            {formik.errors.companyTerms}
          </span>
        )}
        <label className=" mt-4">
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
