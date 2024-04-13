import { object, string } from "yup";

export const createUser = object({
  email: string().required("Campo obrigatório"),
});
