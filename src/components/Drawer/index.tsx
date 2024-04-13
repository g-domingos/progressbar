import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Text,
  Button,
  Drawer as DrawerC,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { colors } from "../../styles/theme";

interface IDrawerInput {
  title: string;
  name: string;
}
const DrawerInput = ({ name, title }: IDrawerInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex flexDirection={"column"}>
      <Text mb="unset">{title}</Text>
      <Input {...register(name)} />
      {errors[name]?.message && (
        <Text color={"red"} fontSize={10}>
          {errors[name]?.message as string}
        </Text>
      )}
    </Flex>
  );
};

interface IDrawer {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  formValues: any;
  formValidationFields: any;
  handleSubmit: any;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  processing?: boolean;
}
const Drawer = ({
  title,
  icon,
  children,
  formValues,
  formValidationFields,
  handleSubmit,
  isOpen,
  onClose,
  onOpen,
  processing,
}: IDrawer) => {
  const btnRef = useRef<any>();

  const methods = useForm<any>({
    resolver: yupResolver(formValidationFields),
    values: formValues,
  });

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        borderRadius={"100%"}
        padding={"unset"}
        background={colors.yellow}
        width={"2rem"}
        height={"2rem"}
        minW={"unset"}
      >
        {icon || <IoMdAdd size={18} color={"black"} />}
      </Button>
      <DrawerC
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <FormProvider {...methods}>
          <DrawerOverlay />
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>{title}</DrawerHeader>

              <DrawerBody>{children}</DrawerBody>

              <DrawerFooter>
                <Button mr={3} onClick={onClose} type="button">
                  Cancelar
                </Button>
                <Button type="submit" background={colors.yellow}>
                  {processing ? <Spinner /> : "Salvar"}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </form>
        </FormProvider>
      </DrawerC>
    </>
  );
};

Drawer.DrawerInput = DrawerInput;

export default Drawer;
