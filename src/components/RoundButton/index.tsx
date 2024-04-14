import { Button } from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

interface IRoundButton {
  handleClick: (values?: any) => void;
  icon?: React.ReactNode;
}
export const RoundButton = ({ icon, handleClick }: IRoundButton) => {
  return (
    <Button
      onClick={handleClick}
      // position={"absolute"}
      // right={"0.4rem"}
      // top={"0.3rem"}
      padding={"5px"}
      minW="unset"
      borderRadius={"100%"}
      width={"1.5rem"}
      height={"1.5rem"}
      _hover={{
        background: "lightgray",
      }}
    >
      {icon ? icon : <MdEdit />}
    </Button>
  );
};
