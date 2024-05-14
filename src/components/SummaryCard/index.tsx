import { Text, Flex, Button } from "@chakra-ui/react";
import { Tag } from "../Tag";
import { MdDelete, MdEdit } from "react-icons/md";
import { RoundButton } from "../RoundButton";
import { useMemo } from "react";

export interface ICardDetail {
  name: string;
  value: string | number;
  color?: string;
}

export interface ISummaryCard {
  id?: number;
  data: ICardDetail[];
  document: string;
  handleEdit?: () => any;
  handleDelete?: () => any;
  hideActions?: boolean;
}

export const SummaryCard = ({
  data,
  document,
  handleEdit,
  handleDelete,
  hideActions,
}: ISummaryCard) => {
  const handleClick = () => {
    handleEdit && handleEdit();
  };

  const dataMemo = useMemo(() => {
    return data || [];
  }, [data]);

  return (
    <Flex
      flexDirection={"column"}
      gap="0.5rem"
      w="14rem"
      height={"14rem"}
      border={"1px solid lightgray"}
      borderRadius={"14px"}
      padding={"0.6rem"}
      transition={"0.2s ease-in-out"}
      _hover={{
        transform: "scale(1.04)",
        cursor: "pointer",
      }}
      position={"relative"}
    >
      {!hideActions && (
        <Flex
          justifyContent={"flex-end"}
          position={"absolute"}
          right={"0.3rem"}
          top={"0.6rem"}
        >
          <RoundButton
            handleClick={() => {
              handleDelete && handleDelete();
            }}
            icon={<MdDelete />}
          />
          <RoundButton
            handleClick={() => {
              handleClick && handleClick();
            }}
          />
        </Flex>
      )}
      <Flex flexDirection={"column"}>
        <Text fontSize={12} marginBottom={"unset"} fontWeight={600}>
          CNPJ:
        </Text>
        <Text marginBottom={"unset"} fontWeight={600}>
          {document}
        </Text>
      </Flex>

      <Flex height={"100%"} overflow={"scroll"} paddingRight="6px">
        <Flex flexDirection={"column"} w={"100%"} gap="0.4rem" h="100%">
          {dataMemo.map((card: ICardDetail) => (
            <Flex gap="1rem" justifyContent={"space-between"}>
              <Flex>
                <Tag
                  text={card.name}
                  background={card.color}
                  fontSize={10}
                  padding="2px 5px"
                />
              </Flex>
              <Flex fontWeight={700}>R${(+card?.value || 0).toFixed(2)}</Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
