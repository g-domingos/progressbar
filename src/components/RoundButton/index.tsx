import { Button } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

interface IRoundButton {
  handleClick: (values?: any) => void;
  icon?: React.ReactNode;
  label?: string;
  backgroundColor?: string;
}
export const RoundButton = ({
  backgroundColor,
  label,
  icon,
  handleClick,
}: IRoundButton) => {
  return (
    <Button
      onClick={handleClick}
      // position={"absolute"}
      // right={"0.4rem"}
      // top={"0.3rem"}
      type="button"
      padding={"5px"}
      minW="unset"
      borderRadius={"100%"}
      width={"1.5rem"}
      height={"1.5rem"}
      _hover={{
        background: "lightgray",
      }}
      background={backgroundColor}
    >
      {icon ? icon : <MdEdit />}
      {label ? label : null}
    </Button>
  );
};
