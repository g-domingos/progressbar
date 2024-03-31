import { Text, Flex } from "@chakra-ui/react";
import { Tag } from "../Tag";

export interface ICardDetail {
  name: string;
  value: string | number;
  color?: string;
}

interface ISummaryCard {
  data: ICardDetail[];
  document: string;
}

export const SummaryCard = ({ data, document }: ISummaryCard) => {
  return (
    <Flex
      justifyContent={"space-between"}
      flexDirection={"column"}
      gap="0.5rem"
      w="100%"
    >
      <Text marginBottom={"unset"} fontWeight={600}>
        CNPJ: {document}
      </Text>
      <Flex>
        <Flex flexDirection={"column"} w={"70%"} gap="0.4rem">
          {data.map((card: ICardDetail) => (
            <Flex justifyContent={"space-between"}>
              <Flex>
                <Tag text={card.name} background={card.color} fontSize={10} />
              </Flex>
              <Flex fontWeight={700}>R${card.value}</Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
