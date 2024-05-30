import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { createUser } from "../../forms/formValidation";
import { useApi } from "../../hooks/useApi";
import Drawer from "../Drawer";
import { useParams } from "react-router-dom";
import { RadioInput } from "../RadioInput";
import { useEffect, useState } from "react";

interface IUserForm {
  user: any;
  refresh: () => void;
  isOpen: boolean;
  onOpen: () => any;
  onClose: () => any;
}

export const UserForm = ({
  user = {},
  refresh,
  isOpen,
  onOpen,
  onClose,
}: IUserForm) => {
  const params = useParams();

  const { request, processing } = useApi({
    path: `/task/${params.id}`,
  });

  const [userInfo, setUserInfo] = useState<any>({});

  const toast = useToast();

  const handleClose = () => {
    setUserInfo(null);
    onClose();
  };

  const updateUser = ({
    permission,
    sub,
  }: {
    permission: string;
    sub: string;
  }) => {
    request({
      method: "put",
      pathParameters: `/users/${sub}`,
      body: { permission },
    }).then((response: any) => {
      onClose();
      refresh();
    });
  };

  const handleSubmit = (values: any) => {
    if (processing) return;

    if (!!user) {
      updateUser(values);
      return;
    }

    request({ method: "post", pathParameters: "/create-user", body: values })
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
      title={user ? "Editar usuário" : "Crie um novo usuário"}
      formValidationFields={createUser}
      formValues={user}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={onOpen}
      processing={processing}
    >
      <Flex flexDirection={"column"} gap="1rem">
        <Drawer.DrawerInput title="Email" name="email" disabled={!!user} />
        <RadioInput
          options={[
            { value: "no", label: "Desabilitar Dashboard" },
            { value: "yes", label: "Habilitar Dashboard" },
          ]}
          name={"permission"}
          defaultValue={"no"}
          title={"Permissão"}
        />
      </Flex>
    </Drawer>
  );
};
