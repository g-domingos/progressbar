import {
  Text,
  Flex,
  Button,
  Input,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { GenericPage } from "../../components/GenericPage";
import colors from "../../styles/theme";
import { ExpandableItem } from "../../components/ExpandableItem";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import { useApi } from "../../hooks/useApi";
import { IManagers } from "../../types/types";
import { useManagers } from "../../hooks/useManagers";
import { ManagerForm } from "../../components/ManagerForm";
import { CiCloudOff } from "react-icons/ci";
import { NoData } from "../../components/NoData";
import { useUsers } from "../../hooks/useUsers";
import { AdminUserForm } from "../../components/AdminUserForm";

interface IMessageModels {
  id: number;
  eventName: string;
  messageTemplate: string;
}

interface IAdminUsers {
  email: string;
  status: string;
  id: string;
}

const ADMIN_USERS_STATUS: any = {
  CONFIRMED: { label: "Confirmado", color: colors.bling },
  FORCE_CHANGE_PASSWORD: {
    label: "Primeiro Acesso Pendente",
    color: colors.tiny,
  },
};
export const Settings = () => {
  const toast = useToast();

  const { request, processing } = useApi({ path: "" });

  const [messageModels, setMessageModels] = useState<IMessageModels[]>([]);

  const [editManager, setEditManager] = useState<IManagers | null>(null);

  const { managers, getManagers, deleteManager, setManagers } = useManagers();

  const { fetchUsersAdmin, usersAdmin, deleteAdmin } = useUsers();

  const {
    isOpen: isOpenManagerForm,
    onClose: onCloseManagerForm,
    onOpen: onOpenManagerForm,
  } = useDisclosure();

  const {
    isOpen: isOpenAdminUser,
    onClose: onCloseAdminUser,
    onOpen: onOpenAdminUser,
  } = useDisclosure();

  const fetchMessageModels = () => {
    request({ method: "get", pathParameters: "/message-models" }).then(
      (response) => {
        setMessageModels(response);
      }
    );
  };

  useEffect(() => {
    fetchMessageModels();
    getManagers();
    fetchUsersAdmin();
  }, []);

  const handleChange = ({
    id,
    field,
    value,
    array,
    setState,
  }: {
    id: number;
    field: string;
    value: string;
    array: any[];
    setState: (value: any) => void;
  }) => {
    const itemToChange = array.find((item: any) => item.id === id);

    const filtered = array.filter((item: any) => item.id !== id);
    const changed = [...filtered, { ...itemToChange, [field]: value }];

    const sorted = changed.sort((a: any, b: any) => a.id - b.id);

    setState(sorted);
  };

  const handleAdd = () => {
    setMessageModels([
      ...messageModels,
      { id: new Date().getTime(), eventName: "", messageTemplate: "" },
    ]);
  };

  const handleRemove = (id: number) => {
    const filtered = messageModels.filter(
      (message: IMessageModels) => message.id !== id
    );

    setMessageModels(filtered);
  };

  const handleSubmit = async () => {
    request({ method: "put", body: messageModels })
      .then(() => {
        toast({
          description: "Modelos de mensagem salvos com sucesso!",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Erro ao atualizar!",
          status: "error",
        });
      });
  };

  const handleRemoveManagers = (id: number) => {
    deleteManager({ managerId: id })
      .then(() => {
        const remainingManagers = managers.filter((item) => item.id !== id);
        setManagers(remainingManagers);

        toast({
          description: "Gerente excluído com sucesso!",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Erro!",
          status: "error",
        });
      });
  };

  const handleEditManager = (manager: IManagers) => {
    setEditManager(manager);
  };

  const handleDeleteAdmin = ({ id }: { id: string }) => {
    deleteAdmin({ id }).then(() => {
      toast({
        description: "Usuário Admin Deletado com sucesso!",
        status: "success",
      });
      fetchUsersAdmin();
    });
  };

  useEffect(() => {
    if (editManager) {
      onOpenManagerForm();
    }
  }, [editManager]);

  return (
    <GenericPage
      title={"Configurações"}
      processing={processing}
    >
      <Flex
        w="100%"
        flexDirection={"column"}
        gap="1rem"
        overflow={"auto"}
      >
        <ExpandableItem title="Usuários Admin">
          <Flex
            flexDirection={"column"}
            w="80%"
            background={colors.gray}
            borderRadius={"10px"}
            gap="0.5rem"
            padding="1rem 2rem"
          >
            <Flex
              w={"100%"}
              justifyContent={"flex-end"}
            >
              <AdminUserForm
                refresh={fetchUsersAdmin}
                isOpen={isOpenAdminUser}
                onOpen={onOpenAdminUser}
                onClose={onCloseAdminUser}
              />
            </Flex>
            {usersAdmin.map((item: IAdminUsers, index: number) => (
              <Flex
                gap="1rem"
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Flex width={"50%"}>
                  <Flex
                    flexDirection={"column"}
                    width={"100%"}
                  >
                    <Text
                      w="45%"
                      mb="0.2rem"
                      fontSize={12}
                    >
                      Email
                    </Text>
                    <Flex
                      gap="1rem"
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <Text
                        borderRadius={"6px"}
                        background={"white"}
                        mb="unset"
                        height={"2rem"}
                        padding="5px 9px"
                        w={"100%"}
                      >
                        {item.email}
                      </Text>
                      <Tooltip
                        label={ADMIN_USERS_STATUS[item.status].label}
                        bg="black"
                      >
                        <Flex
                          width={"10px"}
                          height="10px"
                          background={ADMIN_USERS_STATUS[item.status].color}
                          color="white"
                          borderRadius={"10px"}
                        ></Flex>
                      </Tooltip>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  h={"100%"}
                  alignItems={"flex-end"}
                  className="buttonsContainers"
                  css={{
                    button: {
                      minWidth: "unset",
                      width: "25px",
                      height: "25px",
                    },
                  }}
                  gap="0.6rem"
                >
                  <Button
                    padding={"unset"}
                    borderRadius={"100%"}
                    onClick={() => handleDeleteAdmin({ id: item.id })}
                    _hover={{ background: "white" }}
                  >
                    <MdDelete />
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </ExpandableItem>
        <ExpandableItem title={"Gerentes Responsáveis"}>
          <Flex
            flexDirection={"column"}
            w="100%"
            background={colors.gray}
            borderRadius={"10px"}
          >
            <Flex
              justifyContent={"flex-end"}
              paddingRight={"2rem"}
              paddingTop={"0.6rem"}
            >
              <ManagerForm
                isOpen={isOpenManagerForm}
                onOpen={onOpenManagerForm}
                onClose={onCloseManagerForm}
                refresh={getManagers}
                manager={editManager}
              />
            </Flex>
            <Flex
              width={"100%"}
              minH={"8rem"}
              borderRadius={"0 0 0.5rem 0.5rem"}
              gap="1rem"
              padding="1rem"
              w={"100%"}
              fontSize={12}
              position={"relative"}
              flexDirection={"column"}
              sx={{
                input: {
                  height: "2rem",
                  padding: "5px",
                  background: "white",
                  border: "none",
                },
              }}
            >
              {!managers.length ? (
                <Flex>
                  <NoData />
                </Flex>
              ) : (
                managers.map((item: IManagers, index: number) => (
                  <Flex
                    gap="1rem"
                    justifyContent={"space-around"}
                    alignItems={"flex-start"}
                  >
                    <Flex
                      width={"50%"}
                      flexDirection={"column"}
                    >
                      <Text
                        w="45%"
                        mb="0.2rem"
                      >
                        Nome
                      </Text>
                      <Text
                        padding="10px"
                        borderRadius={"6px"}
                        background={"white"}
                        mb="unset"
                        height={"2rem"}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                    <Flex
                      width={"50%"}
                      flexDirection={"column"}
                    >
                      <Text
                        w="45%"
                        mb="0.2rem"
                      >
                        Email
                      </Text>
                      <Text
                        padding="10px"
                        borderRadius={"6px"}
                        background={"white"}
                        mb="unset"
                        height={"2rem"}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                    <Flex
                      h={"100%"}
                      alignItems={"flex-end"}
                      className="buttonsContainers"
                      css={{
                        button: {
                          minWidth: "unset",
                          width: "25px",
                          height: "25px",
                        },
                      }}
                      gap="0.6rem"
                    >
                      <Button
                        padding={"unset"}
                        borderRadius={"100%"}
                        onClick={() => handleEditManager(item)}
                        _hover={{ background: "white" }}
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        padding={"unset"}
                        borderRadius={"100%"}
                        onClick={() => handleRemoveManagers(item.id)}
                        _hover={{ background: "white" }}
                      >
                        <MdDelete />
                      </Button>
                    </Flex>
                  </Flex>
                ))
              )}
            </Flex>
          </Flex>
        </ExpandableItem>
        <ExpandableItem title={"Modelos de Mensagem de Boas Vindas"}>
          <Flex
            background={colors.gray}
            borderRadius={"0 0 0.5rem 0.5rem"}
            padding="1rem"
            w={"100%"}
            fontSize={12}
            position={"relative"}
            flexDirection={"column"}
            sx={{
              input: {
                height: "2rem",
                padding: "5px",
                background: "white",
                border: "none",
              },
            }}
          >
            <Tooltip
              label="Adicionar um novo modelo"
              placement="left"
              background={"black"}
            >
              <Button
                background={colors.yellow}
                borderRadius={"100%"}
                minW={"unset"}
                minH={"unset"}
                width={"25px"}
                height={"25px"}
                padding={"unset"}
                position={"absolute"}
                top="1rem"
                right={"2.4rem"}
                onClick={handleAdd}
              >
                <FiPlus />
              </Button>
            </Tooltip>
            <Flex
              flexDirection={"column"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "black",
                  borderRadius: "24px",
                },
              }}
            >
              {messageModels.map((item: IMessageModels, index: number) => (
                <Flex
                  key={index}
                  gap="1rem"
                  alignItems={"center"}
                >
                  <Text
                    w="45%"
                    mb="0.2rem"
                  >
                    Nome do Evento
                    <Input
                      value={item.eventName}
                      onChange={(e) =>
                        handleChange({
                          id: item.id,
                          field: "eventName",
                          value: e.target.value,
                          array: messageModels,
                          setState: setMessageModels,
                        })
                      }
                    />
                  </Text>
                  <Text
                    w="45%"
                    mb="0.2rem"
                  >
                    Modelo de Mensagem
                    <Input
                      value={item.messageTemplate}
                      onChange={(e) =>
                        handleChange({
                          id: item.id,
                          field: "messageTemplate",
                          value: e.target.value,
                          array: messageModels,
                          setState: setMessageModels,
                        })
                      }
                    />
                  </Text>
                  {index !== 0 && (
                    <Button
                      padding={"unset"}
                      borderRadius={"100%"}
                      onClick={() => handleRemove(item.id)}
                      _hover={{ background: "white" }}
                    >
                      <MdDelete />
                    </Button>
                  )}
                </Flex>
              ))}
            </Flex>
            <Flex
              width={"100%"}
              justifyContent={"flex-end"}
              mt="10px"
              paddingRight={"4rem"}
            >
              <Button
                background={"white"}
                onClick={handleSubmit}
                height={"1.6rem"}
                fontSize={"13px"}
              >
                Salvar
              </Button>
            </Flex>
          </Flex>
        </ExpandableItem>
      </Flex>
    </GenericPage>
  );
};
