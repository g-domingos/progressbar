import { LuBarChart3 } from "react-icons/lu";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { CompareResults } from "../CompareResults";

export const CompareModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent minWidth="fit-content">
          <ModalHeader>Comparar Resultados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CompareResults />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
