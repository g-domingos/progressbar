import { Text, Flex, Button, Input, Tooltip, useToast } from "@chakra-ui/react";
import { GenericPage } from "../../components/GenericPage";
import { colors } from "../../styles/theme";
import { ExpandableItem } from "../../components/ExpandableItem";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { url } from "../../env";

interface IMessageModels {
  id: number;
  eventName: string;
  messageTemplate: string;
}
export const Settings = () => {
  const toast = useToast();
  const urlLink = url.ENDPOINT + "/message-models";

  const [messageModels, setMessageModels] = useState<IMessageModels[]>([]);

  const fetchMessageModels = () => {
    axios.get(urlLink).then((response) => {
      const body = JSON.parse(response?.data?.body);

      setMessageModels(body || []);
    });
  };

  useEffect(() => {
    fetchMessageModels();
  }, []);

  const handleChange = ({
    id,
    field,
    value,
  }: {
    id: number;
    field: string;
    value: string;
  }) => {
    const itemToChange = messageModels.find(
      (item: IMessageModels) => item.id === id
    );

    const filtered = messageModels.filter(
      (item: IMessageModels) => item.id !== id
    );
    const changed = [...filtered, { ...itemToChange, [field]: value }];

    const sorted = changed.sort((a: any, b: any) => a.id - b.id);

    setMessageModels(sorted as IMessageModels[]);
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
    await axios
      .put(urlLink, messageModels)
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

  return (
    <GenericPage title={"Configurações"}>
      <Flex w="100%" flexDirection={"column"}>
        <ExpandableItem title={"Modelos de Mensagem de Boas Vindas"}>
          <Flex
            background={colors.gray}
            borderRadius={"0 0 0.5rem 0.5rem"}
            padding="1rem"
            w={"60%"}
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
                top="0.4rem"
                right={"0.5rem"}
                onClick={handleAdd}
              >
                <FiPlus />
              </Button>
            </Tooltip>
            <Flex
              flexDirection={"column"}
              maxH={"13rem"}
              overflow={"auto"}
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
                <Flex key={index} gap="1rem" alignItems={"center"}>
                  <Text>
                    Nome do Evento
                    <Input
                      value={item.eventName}
                      onChange={(e) =>
                        handleChange({
                          id: item.id,
                          field: "eventName",
                          value: e.target.value,
                        })
                      }
                    />
                  </Text>
                  <Text>
                    Modelo de Mensagem
                    <Input
                      value={item.messageTemplate}
                      onChange={(e) =>
                        handleChange({
                          id: item.id,
                          field: "messageTemplate",
                          value: e.target.value,
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
            <Flex width={"100%"} justifyContent={"flex-end"} mt="10px">
              <Button background={"white"} onClick={handleSubmit}>
                Salvar
              </Button>
            </Flex>
          </Flex>
        </ExpandableItem>
      </Flex>
    </GenericPage>
  );
};
