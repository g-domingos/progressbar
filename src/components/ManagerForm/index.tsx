import Drawer from "../Drawer";
import { createManagerForm } from "../../forms/formValidation";
import { useManagers } from "../../hooks/useManagers";
import { IManagers } from "../../types/types";
import { useToast } from "@chakra-ui/react";

interface IManagerForm {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  refresh: () => void;
  manager?: IManagers | null;
}
export const ManagerForm = ({
  isOpen,
  onOpen,
  onClose,
  refresh,
  manager,
}: IManagerForm) => {
  const { saveManagers, updateManager, processing } = useManagers();

  const toast = useToast();

  const handleSave = (values: IManagers) => {
    saveManagers(values)
      .then(() => {
        refresh();
        onClose();

        toast({
          description: "Gerentes salvos com sucesso!",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Erro ao salvar!",
          status: "error",
        });
      });
  };

  const handleEdit = (values: IManagers) => {
    const updatedManager = { ...manager, ...values };

    updateManager(updatedManager)
      .then((response) => {
        toast({
          description: "Gerente atualizado com sucesso!",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "Erro ao atualizar!",
          status: "error",
        });
      });
  };
  return (
    <Drawer
      title={manager ? "Editar Gerente" : "Adicionar Gerente"}
      formValues={manager}
      formValidationFields={createManagerForm}
      handleSubmit={(values: IManagers) => {
        manager ? handleEdit(values) : handleSave(values);
      }}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      processing={processing}
    >
      <Drawer.DrawerInput
        title="Nome"
        name="name"
      />
      <Drawer.DrawerInput
        title="Email"
        name="email"
      />
    </Drawer>
  );
};
