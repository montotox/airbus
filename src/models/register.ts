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
  subgroup_name: string;
  user_data?: {};
}

export interface Register {
  email: string;
  password: string;
  passwordConfirmation?: string;
  firstName: string;
  company: string;
  cluster: Cluster;
}

export const registerResponse = (register: RegisterDTO) => {
  const formattedRegister: Register = {
    email: nullToEmpty(register.email),
    password: nullToEmpty(register.password),
    firstName: nullToEmpty(register.first_name),
    company: nullToEmpty(register.company),
    cluster: nullToEmpty(register.subgroup_name),
  };
  return formattedRegister;
};

export const registerRequest = (register: Register) => {
  const apiFormatRegister = {
    email: register.email,
    first_name: register.firstName,
    password: register.password,
    company: register.company,
    subgroup_name: register.cluster.value,
  };
  return apiFormatRegister;
};
