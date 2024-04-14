import { Text, Flex, Button } from "@chakra-ui/react";
import { Tag } from "../Tag";
import { MdDelete, MdEdit } from "react-icons/md";
import { RoundButton } from "../RoundButton";

export interface ICardDetail {
  name: string;
  value: string | number;
  color?: string;
}

export interface ISummaryCard {
  id?: number;
  data: ICardDetail[];
  document: string;
  handleEdit: () => any;
  handleDelete: () => any;
}

export const SummaryCard = ({
  data,
  document,
  handleEdit,
  handleDelete,
}: ISummaryCard) => {
  const handleClick = () => {
    handleEdit();
  };

  return (
    <Flex
      flexDirection={"column"}
      gap="1rem"
      w="12rem"
      height={"13rem"}
      border={"1px solid lightgray"}
      borderRadius={"14px"}
      padding={"1rem"}
      transition={"0.2s ease-in-out"}
      _hover={{
        transform: "scale(1.04)",
        cursor: "pointer",
      }}
      position={"relative"}
    >
      <Flex
        justifyContent={"flex-end"}
        position={"absolute"}
        right={"0.3rem"}
        top={"0.6rem"}
      >
        <RoundButton handleClick={handleDelete} icon={<MdDelete />} />
        <RoundButton handleClick={handleClick} />
      </Flex>
      <Flex flexDirection={"column"}>
        <Text fontSize={12} marginBottom={"unset"} fontWeight={600}>
          CNPJ:
        </Text>
        <Text marginBottom={"unset"} fontWeight={600}>
          {document}
        </Text>
      </Flex>

      <Flex overflow={"scroll"}>
        <Flex flexDirection={"column"} w={"100%"} gap="0.4rem">
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
