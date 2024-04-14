import { Text, Flex, useDisclosure, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { colors } from "../../styles/theme";
import {
  ICardDetail,
  ISummaryCard,
  SummaryCard,
} from "../../components/SummaryCard";
import { RoundButton } from "../../components/RoundButton";
import { CnpjForm, IBefore } from "../../components/CnpjForm";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router";
import { CiCloudOff } from "react-icons/ci";

export const GeneralInfoTask = () => {
  const [cnpjs, setCnpjs] = useState<IBefore[]>([]);
  const [editCnpj, setEditCnpj] = useState<IBefore | undefined>();

  const toast = useToast();
  const params = useParams();
  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const fetchBeforeData = () => {
    request({ method: "get", pathParameters: "/before" }).then(
      (response: IBefore[]) => {
        const sorted = response.sort((a: IBefore, b: IBefore) => a.id - b.id);
        setCnpjs(sorted);
      }
    );
  };

  useEffect(() => {
    fetchBeforeData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = ({ id }: { id: number | undefined }) => {
    const cnpjToEdit = cnpjs.find((item: IBefore) => item.id === id);

    setEditCnpj(cnpjToEdit);
    onOpen();
  };

  const handleDelete = ({ id }: { id: number | undefined }) => {
    request({ method: "del", pathParameters: `/delete-before/${id}` })
      .then(() => {
        toast({ description: "CNPJ excluído com sucesso!", status: "success" });
        fetchBeforeData();
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
            Cenário Antes da Integracomm
          </Text>
          <CnpjForm
            isOpen={isOpen}
            onClose={handleCloseForm}
            onOpen={onOpen}
            refresh={fetchBeforeData}
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
            cnpjs.map((card: IBefore, index: number) => (
              <SummaryCard
                key={index}
                data={card.data}
                document={card.document}
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