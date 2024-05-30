import { useEffect, useMemo, useState } from "react";
import { GenericPage } from "../../../components/GenericPage";
import { url } from "../../../env";
import axios from "axios";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { ClientCard, SearchBar } from "../styles";
import { useNavigate } from "react-router";
import { useApi } from "../../../hooks/useApi";
import { CardClients } from "../../../components/CardClients";

export const BackofficeClients = () => {
  const [clientsAssessory, setClientsAssessory] = useState<any[]>();
  const [searchName, setSearchName] = useState<string>("");

  const navigate = useNavigate();

  const toast = useToast();

  const { request, processing } = useApi({ path: "/clients/tasks" });

  const getClientsAssessory = () => {
    request({ method: "get" })
      .then((response: any) => {
        setClientsAssessory(
          response.sort((a: any, b: any) => a.name.localeCompare(b.name))
        );
      })
      .catch((err: any) => {
        toast({ description: "Erro ao carregar informações!" });
      });
  };

  useEffect(() => {
    if (!processing) {
      getClientsAssessory();
    }
  }, []);

  const dataArrayMemo = useMemo(() => {
    if (searchName.length) {
      return clientsAssessory?.filter((item: any) =>
        item.name.toLowerCase().includes(searchName)
      );
    }

    return clientsAssessory;
  }, [searchName, clientsAssessory]);

  const handleFilter = (name: string) => {
    setSearchName(name.toLowerCase());
  };

  return (
    <GenericPage title={"Clientes"}>
      <Flex flexDirection={"column"} w={"100%"}>
        <SearchBar>
          <input
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Pesquisar..."
            autoFocus
          />
        </SearchBar>
        <Flex
          overflow={"auto"}
          flexWrap={"wrap"}
          height={"90%"}
          padding="10px"
          gap="1rem"
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
          {processing ? (
            <Flex
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner />
            </Flex>
          ) : (
            dataArrayMemo?.map(
              (
                client: {
                  id: string;
                  name: string;
                  status: { color: string; status: string };
                },
                index: number
              ) => (
                <CardClients
                  title={client.name}
                  id={client.id}
                  status={client.status.status}
                />
              )
            )
          )}
        </Flex>
      </Flex>
    </GenericPage>
  );
};
