import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { createUser } from "../../forms/formValidation";
import { useApi } from "../../hooks/useApi";
import Drawer from "../Drawer";
import { useParams } from "react-router-dom";
import { RadioInput } from "../RadioInput";

interface IUserForm {
  user: any;
  refresh: () => void;
}
export const UserForm = ({ user, refresh }: IUserForm) => {
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { request, processing } = useApi({
    path: `/task/${params.id}/create-user`,
  });

  const toast = useToast();

  const handleSubmit = (values: any) => {
    if (processing) return;

    request({ method: "post", body: values })
      .then((response) => {
        toast({
          description: "Usuário criado com sucesso!",
          status: "success",
        });
        onClose();
        refresh();
      })
      .catch((error) => {
        toast({
          description: "Erro ao criar usuário!",
          status: "error",
        });
      });
  };

  return (
    <Drawer
      title={"Crie um novo usuário"}
      formValidationFields={createUser}
      formValues={user}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      processing={processing}
    >
      <Flex flexDirection={"column"} gap="1rem">
        <Drawer.DrawerInput title="Email" name="email" />
        <RadioInput
          options={[
            { value: "no", label: "Desabilitar Dashboard" },
            { value: "yes", label: "Habilitar" },
          ]}
          name={"permission"}
          defaultValue={"no"}
          title={"Permissão"}
        />
      </Flex>
    </Drawer>
  );
};
