import axios from "axios";
import { RegisterDTO, Register, registerRequest } from "@/models/register";

export const registerUser = (register: Register) => {
  const controller = new AbortController();
  const apiFormatRegister = registerRequest(register);
  return {
    call: axios.post<RegisterDTO>(
      "https://prod-api.cclgrn.com/dashboard/api/email/create_user/",
      apiFormatRegister,
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
