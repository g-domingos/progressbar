import { object, string } from "yup";

export const createUser = object({
  email: string().required("Campo obrigatório"),
});

export const createCnpj = object({
  document: string().required("Campo obrigatório"),
});
