import { Flex } from "@chakra-ui/react";
import { GenericPage } from "../../components/GenericPage";
import { CompareResults } from "../../components/CompareResults";

export const Metrics = () => {
  return (
    <GenericPage title="Métricas">
      <Flex w={"100%"}>
        <CompareResults />
      </Flex>
    </GenericPage>
  );
};
