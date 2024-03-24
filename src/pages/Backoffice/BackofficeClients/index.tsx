import { useEffect, useMemo, useState } from "react";
import { GenericPage } from "../../../components/GenericPage";
import { url } from "../../../env";
import axios from "axios";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { ClientCard, SearchBar } from "../styles";

export const BackofficeClients = () => {
  const [clientsAssessory, setClientsAssessory] = useState<any[]>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");

  const toast = useToast();

  const getClientsAssessory = () => {
    setProcessing(true);
    axios
      .get(url.ENDPOINT + "/clients/tasks")
      .then((response: any) => {
        setClientsAssessory(
          JSON.parse(response.data.body).sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          )
        );
        setProcessing(false);
      })
      .catch((err: any) => {
        console.log(err);
        setProcessing(false);
        toast({ description: "Erro ao carregar informações!" });
      });
  };

  useEffect(() => {
    getClientsAssessory();
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

  const handleOpenDash = ({ taskId, isAssessory }: any) => {
    const currentUrl = window.location.href;

    const url = currentUrl.split("#")[0];

    let goToUrl = url + `#/client-id/${taskId}`;

    if (isAssessory) {
      goToUrl = url + `#/clients/${taskId}`;
    }

    window.open(goToUrl);
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
          height={"100%"}
          flexWrap={"wrap"}
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
            dataArrayMemo?.map((client: any, index: number) => (
              <ClientCard
                onClick={() =>
                  handleOpenDash({ taskId: client.id, isAssessory: true })
                }
                key={index}
              >
                <label>{client?.name}</label>
                <div>
                  <span>{client?.status?.status.toUpperCase()}</span>
                </div>
              </ClientCard>
            ))
          )}
        </Flex>
      </Flex>
    </GenericPage>
  );
};
