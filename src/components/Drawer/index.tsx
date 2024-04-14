import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
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
import { useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { colors } from "../../styles/theme";
import { MdAdd } from "react-icons/md";

interface IDrawerArrayInput {
  title: string;
  name: string;
}

const DrawerArrayInput = ({ name, title }: IDrawerArrayInput) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {}, []);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: name,
    }
  );

  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Flex
        gap="1rem"
        alignItems={"center"}
        mt="10px"
        justifyContent={"flex-end"}
      >
        <Text fontSize={12} mb="unset">
          Marketplaces
        </Text>
        <Button
          padding={"5px"}
          minW="unset"
          borderRadius={"100%"}
          width={"1.5rem"}
          height={"1.5rem"}
          _hover={{
            background: "lightgray",
          }}
          type="button"
          onClick={() =>
            append({ name: "", value: "", id: new Date().getTime() })
          }
          background={colors.yellow}
        >
          <MdAdd />
        </Button>
      </Flex>
      {fields.map((field: any, index: number) => (
        <Flex gap="5px" fontSize={12}>
          <Text>
            Marketplace
            <Input key={field?.id} {...register(`${name}.${index}.name`)} />
          </Text>
          <Text>
            Valor R$
            <Input
              key={field?.id}
              {...register(`${name}.${index}.value`)}
              type="number"
              step={"0.01"}
            />
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

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
  ref?: any;
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
  ref,
}: IDrawer) => {
  const methods = useForm<any>({
    resolver: yupResolver(formValidationFields),
    values: formValues,
  });

  const submitForm = (values: any) => {
    handleSubmit(values);
    methods.reset();
  };

  const handleClose = () => {
    methods.reset({ data: [], document: "", id: null });
    onClose();
  };

  useEffect(() => {
    if (isOpen && formValues) {
      const fields = Object.entries(formValues);

      fields.forEach(([field, value]: any) => methods.setValue(field, value));
    }
  }, [isOpen]);

  return (
    <>
      <Button
        ref={ref}
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
      {isOpen && (
        <DrawerC isOpen={isOpen} placement="right" onClose={handleClose}>
          <FormProvider {...methods}>
            <DrawerOverlay />
            <form onSubmit={methods.handleSubmit(submitForm)}>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{title}</DrawerHeader>

                <DrawerBody>{children}</DrawerBody>

                <DrawerFooter>
                  <Button mr={3} onClick={handleClose} type="button">
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
      )}
    </>
  );
};

Drawer.DrawerInput = DrawerInput;
Drawer.DrawerArrayInput = DrawerArrayInput;
export default Drawer;
