import { Text, Flex, useDisclosure, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { SummaryCard } from "../../components/SummaryCard";
import { CnpjForm, IInfo } from "../../components/CnpjForm";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router";
import { CiCloudOff } from "react-icons/ci";
import { useManagers } from "../../hooks/useManagers";

export const GeneralInfoTask = () => {
  const [cnpjs, setCnpjs] = useState<IInfo[]>([]);
  const [editCnpj, setEditCnpj] = useState<IInfo | undefined>();

  const toast = useToast();
  const params = useParams();
  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const { managers, assignTaskToManager, getManagers } = useManagers();
  const [currentManager, setCurrentManager] = useState<any>({});

  const fetchGeneralInfoByCNPJ = () => {
    request({ method: "get", pathParameters: "/info" }).then(
      (response: { info: any[]; manager: any }) => {
        const sorted = response?.info?.sort(
          (a: IInfo, b: IInfo) => a.id - b.id
        );
        setCnpjs(sorted);

        if (response.manager) {
          const formatedManager = {
            label: response.manager.managerName,
            value: response.manager.managerId,
          };
          setCurrentManager(formatedManager);
        }
      }
    );
  };

  useEffect(() => {
    fetchGeneralInfoByCNPJ();
    getManagers();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = ({ id }: { id: number | undefined }) => {
    const cnpjToEdit = cnpjs.find((item: IInfo) => item.id === id);

    setEditCnpj(cnpjToEdit);
    onOpen();
  };

  const handleDelete = ({ id }: { id: number | undefined }) => {
    request({ method: "del", pathParameters: `/delete-info/${id}` })
      .then(() => {
        toast({ description: "CNPJ excluído com sucesso!", status: "success" });
        fetchGeneralInfoByCNPJ();
      })
      .catch(() => {
        toast({ description: "Erro ao excluir!", status: "error" });
      });
  };

  const handleChangeManager = (
    values: { label: string; value: number } | null
  ) => {
    let body = null;

    if (values) {
      setCurrentManager({ label: values.label, value: values.value });

      body = { managerName: values.label, managerId: values.value };
    } else {
      setCurrentManager({});
    }

    assignTaskToManager({
      taskId: params.id || "",
      body,
    })
      .then(() => {
        toast({
          description: "Gerente responsável atualizado com sucesso!",
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

  const handleCloseForm = () => {
    setEditCnpj(undefined);
    onClose();
  };

  const managersFormatedForSelect = useMemo(() => {
    if (!managers.length) return [];

    return managers.map((item) => {
      return { value: item.id, label: item.name };
    });
  }, [managers]);

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
      fontWeight: 600,
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
    <Flex
      w="100%"
      height={"100%"}
    >
      <Flex
        flexDirection={"column"}
        w="100%"
        height={"100%"}
      >
        <Flex
          alignItems={"center"}
          gap="1rem"
          mb="0.8rem"
        >
          <Text
            fontWeight={600}
            mb="unset"
          >
            Gerente Responsável:
          </Text>
          <Select
            value={currentManager}
            options={managersFormatedForSelect}
            styles={styles}
            isClearable
            placeholder="Selecionar"
            onChange={handleChangeManager}
          />
        </Flex>
        <Flex
          alignItems={"center"}
          gap="1rem"
          mb="1rem"
        >
          <Text
            mb="unset"
            fontWeight={600}
          >
            Configuração por CNPJ
          </Text>
          <CnpjForm
            isOpen={isOpen}
            onClose={handleCloseForm}
            onOpen={onOpen}
            refresh={fetchGeneralInfoByCNPJ}
            cnpj={editCnpj}
          />
        </Flex>
        <Flex
          className="cardContainers"
          gap="1rem"
          w={"100%"}
        >
          {processing ? (
            <Flex
              w="100%"
              height={"10rem"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner />
            </Flex>
          ) : cnpjs.length ? (
            cnpjs.map((card: IInfo, index: number) => (
              <SummaryCard
                key={index}
                data={card?.data}
                extraInfo={card?.extraInfo}
                document={card?.document}
                handleEdit={() => handleEdit({ id: card.id })}
                handleDelete={() => handleDelete({ id: card.id })}
              />
            ))
          ) : (
            <Flex
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              flexDirection={"column"}
              opacity={"0.5"}
              justifyContent={"center"}
            >
              <CiCloudOff size={30} />
              <Text>Ainda não há cenário cadastrado para esse cliente</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
