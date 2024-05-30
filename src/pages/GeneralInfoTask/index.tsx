import { Text, Flex, useDisclosure, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import colors from "../../styles/theme";
import { ISummaryCard, SummaryCard } from "../../components/SummaryCard";
import { CnpjForm, IInfo } from "../../components/CnpjForm";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router";
import { CiCloudOff } from "react-icons/ci";

export const GeneralInfoTask = () => {
  const [cnpjs, setCnpjs] = useState<IInfo[]>([]);
  const [editCnpj, setEditCnpj] = useState<IInfo | undefined>();

  const toast = useToast();
  const params = useParams();
  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const fetchGeneralInfoByCNPJ = () => {
    request({ method: "get", pathParameters: "/info" }).then(
      (response: IInfo[]) => {
        const sorted = response.sort((a: IInfo, b: IInfo) => a.id - b.id);
        setCnpjs(sorted);
      }
    );
  };

  useEffect(() => {
    fetchGeneralInfoByCNPJ();
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

  const handleCloseForm = () => {
    setEditCnpj(undefined);
    onClose();
  };

  return (
    <Flex w="100%" height={"100%"}>
      <Flex flexDirection={"column"} w="100%" height={"100%"}>
        <Flex alignItems={"center"} gap="1rem" mb="1rem">
          <Text mb="unset" fontWeight={600}>
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
        <Flex className="cardContainers" gap="1rem" w={"100%"}>
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
