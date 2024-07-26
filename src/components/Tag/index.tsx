import { Flex, Text } from "@chakra-ui/react";

interface ITag {
  text: string | number;
  color?: string;
  background?: string;
  padding?: string;
  fontSize?: number;
}

type DivProps = React.HTMLProps<HTMLDivElement>;

type AllTogether = ITag & DivProps;

export const Tag = ({
  fontSize,
  text,
  background,
  color,
  padding,
  ...rest
}: AllTogether) => {
  return (
    <div
      style={{ display: "flex" }}
      {...rest}
    >
      <Text
        background={background || "lightgray"}
        color={color || "black"}
        padding={padding || "3px 6px"}
        borderRadius={"6px"}
        fontSize={fontSize || 12}
        fontWeight={700}
        marginBottom={"unset"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {text}
      </Text>
    </div>
  );
};
