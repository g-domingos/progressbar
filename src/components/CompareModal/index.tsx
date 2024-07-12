import { LuBarChart3 } from "react-icons/lu";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { CompareResults } from "../CompareResults";
import { useSearchParams } from "react-router-dom";

export const CompareModal = () => {
  const [, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    setSearchParams({});
    onClose();
  };
  return (
    <>
      <Tooltip
        label="Comparar Resultados"
        bg="black"
      >
        <Button
          onClick={onOpen}
          borderRadius={"100%"}
          _hover={{
            background: "lightgray",
          }}
          padding={"unset"}
        >
          <LuBarChart3 />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent
          minWidth="fit-content"
          minH={"550px"}
        >
          <ModalCloseButton />
          <ModalBody>
            <CompareResults />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
