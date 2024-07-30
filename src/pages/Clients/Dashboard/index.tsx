import { Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { GenericPage } from "../../../components/GenericPage";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { useParams } from "react-router-dom";
import { IInfo } from "../../../components/CnpjForm";
import { CiCloudOff } from "react-icons/ci";
import { Cenario } from "../../../components/Cenario";

export const Dashboard = () => {
  const params = useParams();

  const [cnpjs, setCnpjs] = useState<IInfo[]>([]);

  const { request, processing } = useApi({ path: `/task/${params.id}` });

  const fetchGeneralInfoByTask = () => {
    request({ method: "get", pathParameters: "/info" }).then(
      (response: any) => {
        const sorted = response?.info?.sort(
          (a: IInfo, b: IInfo) => a.id - b.id
        );
        setCnpjs(sorted);
      }
    );
  };

  useEffect(() => {
    if (!processing) {
      fetchGeneralInfoByTask();
    }
  }, []);

  const gridTemplateColumns = "0.6fr 3fr";

  return (
    <GenericPage title={"Dashboard"}>
      <Flex
        width={"100%"}
        fontSize={14}
        flexDirection={"column"}
      >
        <Flex
          width={"100%"}
          display={"grid"}
          gridTemplateColumns={gridTemplateColumns}
          gap="1rem"
          padding={"1rem 0"}
          css={{ p: { marginBottom: "unset" } }}
        >
          <Flex>
            <Text fontWeight={500}>
              Cenário <strong>antes</strong> da <strong>Integracomm</strong>
            </Text>
          </Flex>
          <Flex>
            <Text>
              Cenário <strong>com</strong> a{" "}
              <strong style={{ fontSize: 14 }}>Integracomm</strong>
            </Text>
          </Flex>
        </Flex>
        <Flex
          width={"100%"}
          h={"100%"}
          overflowY={"auto"}
          flexDirection={"column"}
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
          ) : !cnpjs.length ? (
            <Flex
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              flexDirection={"column"}
              opacity={"0.5"}
              justifyContent={"center"}
            >
              <CiCloudOff size={30} />
            </Flex>
          ) : (
            cnpjs?.map((item: any, index: number) => (
              <Cenario
                cnpjId={item.id}
                gridTemplateColumns={gridTemplateColumns}
                integrator={item?.integrator}
                taskId={params.id}
                apiId={cnpjs[0]?.api[0]?.id}
              />
            ))
          )}
        </Flex>
      </Flex>
    </GenericPage>
  );
};
