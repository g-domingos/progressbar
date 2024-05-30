import { mixed, object, string } from "yup";

export const createUser = object({
  email: string().required("Campo obrigatório"),
  permission: mixed(),
});

export const createCnpj = object({
  document: string().required("Campo obrigatório"),
});

export const blingIntegrationForm = object({
  inviteLink: string().required("Campo obrigatório"),
  clientId: string().required("Campo obrigatório"),
  clientSecret: string().required("Campo obrigatório"),
});
