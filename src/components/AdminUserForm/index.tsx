import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { createUser } from "../../forms/formValidation";
import { useApi } from "../../hooks/useApi";
import Drawer from "../Drawer";
import { useParams } from "react-router-dom";
import { RadioInput } from "../RadioInput";
import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";

interface IUserForm {
  refresh: () => void;
  isOpen: boolean;
  onOpen: () => any;
  onClose: () => any;
  isAdmin?: boolean;
}

export const AdminUserForm = ({
  refresh,
  isOpen,
  onOpen,
  onClose,
  isAdmin,
}: IUserForm) => {
  const params = useParams();

  const { createAdminUser, processing } = useUsers();

  const toast = useToast();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (values: any) => {
    if (processing) return;

    createAdminUser({ email: values.email })
      .then((response) => {
        toast({
          description:
            "Usuário criado com sucesso!  Senha de primeiro acesso: #Integracomm123",
          status: "success",
          duration: 5000,
          isClosable: true,
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
      title={"Crie um novo Usuário Admin"}
      formValidationFields={createUser}
      formValues={{}}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={onOpen}
      processing={processing}
    >
      <Flex
        flexDirection={"column"}
        gap="1rem"
      >
        <Drawer.DrawerInput
          title="Email"
          name="email"
        />
      </Flex>
    </Drawer>
  );
};
