import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import { GenericPage } from "../../../components/GenericPage";
import { Text, Flex, Input, Spinner, useToast } from "@chakra-ui/react";
import { useApi } from "../../../hooks/useApi";
import { CardClients } from "../../../components/CardClients";
import { SearchBar } from "../styles";
import { useManagers } from "../../../hooks/useManagers";

export const BackofficeClients = () => {
  const [clientsAssessory, setClientsAssessory] = useState<any[]>();
  const [searchName, setSearchName] = useState<string>("");
  const [manager, setManager] = useState<any>(null);

  const toast = useToast();

  const { request, processing } = useApi({ path: "/clients/tasks" });

  const { managers, getManagers } = useManagers();

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
      getManagers();
    }
  }, []);

  const dataArrayMemo = useMemo(() => {
    if (!!manager) {
      return clientsAssessory?.filter(
        (item: any) => item?.manager?.managerId === manager
      );
    }

    if (searchName.length) {
      return clientsAssessory?.filter((item: any) =>
        item.name.toLowerCase().includes(searchName)
      );
    }

    return clientsAssessory;
  }, [searchName, clientsAssessory, manager]);

  const handleFilter = (name: string) => {
    setSearchName(name.toLowerCase());
  };

  const managersFormatedForSelect = useMemo(() => {
    if (!managers.length) return [];

    return managers.map((item) => {
      return { value: item.id, label: item.name };
    });
  }, [managers]);

  const handleChangeManager = (values: any) => {
    setManager(values?.value || null);
  };

  const styles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the overall container
      width: "240px", // Adjust width as needed
      borderRadius: "8px",
      backgroundColor: "#fff",
      borderColor: "#ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      height: "2.5rem",
      "&:hover": {
        borderColor: "#999",
      },
      border: "none",
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      // Customize individual options
      padding: "10px 15px",
      backgroundColor: state.isSelected ? "#f0f8ff" : "#fff",
      color: state.isSelected ? "#007bff" : "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f0f8ff",
      },
    }),

    menu: (baseStyles: any) => ({
      ...baseStyles,
      // Customize the dropdown menu
      width: "250px", // Match the control width
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "24px",
      },
    }),

    // Customize other elements as needed:
    // singleValue, placeholder, multiValue, dropdownIndicator, etc.
  };

  return (
    <GenericPage title={"Clientes"}>
      <Flex
        flexDirection={"column"}
        w={"100%"}
      >
        <Flex
          gap="1rem"
          css={{
            p: { marginBottom: "unset", fontSize: 12 },
          }}
        >
          <Flex flexDirection={"column"}>
            <Text>Pesquisar por nome</Text>
            <Input
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Pesquisar..."
              autoFocus
              boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
              border={"none"}
            />
          </Flex>
          <Flex flexDirection={"column"}>
            <Text>Filtrar por Gerente</Text>
            <Select
              options={managersFormatedForSelect}
              styles={styles}
              isClearable
              placeholder="Selecionar"
              onChange={handleChangeManager}
            />
          </Flex>
        </Flex>
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
                  manager: { managerName: string };
                },
                index: number
              ) => (
                <CardClients
                  title={client.name}
                  id={client.id}
                  status={client.status.status}
                  manager={client?.manager?.managerName}
                />
              )
            )
          )}
        </Flex>
      </Flex>
    </GenericPage>
  );
};
