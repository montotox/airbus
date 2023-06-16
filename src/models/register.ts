import { nullToEmpty } from "@/utilities/format-data-utilities";

export interface Cluster {
  value: string;
  label: string;
}

export interface RegisterDTO {
  email: string;
  first_name: string;
  password: string;
  company: string;
  subgroup: string;
  user_data?: {};
  company_terms?: boolean;
  terms?: boolean;
  newsletter?: boolean;
  conditions?: boolean;
}

export interface Register {
  email: string;
  password: string;
  passwordConfirmation?: string;
  firstName: string;
  company: string;
  subgroup: Cluster;
  companyTerms?: boolean;
  terms?: boolean;
  newsletter?: boolean;
  conditions?: boolean;
}

export const registerResponse = (register: RegisterDTO) => {
  const formattedRegister: Register = {
    email: nullToEmpty(register.email),
    password: nullToEmpty(register.password),
    firstName: nullToEmpty(register.first_name),
    company: nullToEmpty(register.company),
    subgroup: nullToEmpty(register.subgroup),
    companyTerms: register.company_terms,
    terms: register.terms,
    newsletter: register.newsletter,
    conditions: register.conditions,
  };
  return formattedRegister;
};

export const registerRequest = (register: Register) => {
  const apiFormatRegister = {
    email: register.email,
    first_name: register.firstName,
    password: register.password,
    company: register.company,
    subgroup: register.subgroup.value,
    company_terms: register.companyTerms,
    terms: register.terms,
    newsletter: register.newsletter,
    conditions: register.conditions,
  };
  return apiFormatRegister;
};
