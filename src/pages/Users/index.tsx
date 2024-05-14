import { Text, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { UserForm } from "../../components/UserForm";
import { CiCloudOff } from "react-icons/ci";
import { RoundButton } from "../../components/RoundButton";
import { MdDelete } from "react-icons/md";

export const Users = () => {
  const params = useParams();
  const toast = useToast();

  const { request, processing } = useApi({ path: `/task/${params.id}/users` });

  const [users, setUsers] = useState<any[]>([]);

  const [editUser, setEditUser] = useState<any>({});

  const retrieveUsers = () => {
    request({ method: "get" }).then((response) => {
      setUsers(response);
    });
  };

  const deleteUser = (userEmail: string) => {
    request({ method: "del", queryStringParameters: { userEmail } })
      .then(() => {
        toast({
          description: "Usuário deletado com sucesso!",
          status: "success",
        });

        const filtered = users.filter((item: any) => item.email !== userEmail);

        setUsers(filtered);
      })
      .catch(() => {
        toast({
          description: "Erro ao deletar!",
          status: "error",
        });
      });
  };

  useEffect(() => {
    retrieveUsers();
  }, []);

  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Flex
        alignItems={"center"}
        gap="1rem"
        justifyContent={"flex-end"}
        w={"100%"}
      >
        <Flex>Adicionar Usuário </Flex>
        <UserForm user={editUser} refresh={retrieveUsers} />
      </Flex>
      <Flex
        flexDirection={"column"}
        border="1px solid lightgray"
        borderRadius={"6px"}
        padding="10px"
        mt="1rem"
      >
        {processing ? (
          <Flex width={"100%"} justifyContent={"center"}>
            <Spinner />
          </Flex>
        ) : users.length ? (
          users.map((user: any) => (
            <Flex
              padding={"4px"}
              borderBottom={"1px solid lightgray"}
              justifyContent={"space-between"}
            >
              <Text marginBottom={"unset"}>{user.email}</Text>
              <Flex>
                <RoundButton
                  icon={<MdDelete />}
                  handleClick={() => deleteUser(user.email)}
                />
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex
            width={"100%"}
            alignItems={"center"}
            flexDirection={"column"}
            opacity={"0.5"}
            justifyContent={"center"}
          >
            <CiCloudOff size={30} />
            <Text>Ainda não há usuários cadastrados para esse cliente</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
