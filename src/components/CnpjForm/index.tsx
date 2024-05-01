import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { createCnpj, createUser } from "../../forms/formValidation";
import { useApi } from "../../hooks/useApi";
import Drawer from "../Drawer";
import { useParams } from "react-router-dom";
import { ICardDetail } from "../SummaryCard";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

interface ICnpjForm {
  cnpj?: IInfo;
  refresh: () => void;
  isOpen: boolean;
  onOpen: () => any;
  onClose: () => any;
}

export interface IInfo {
  id: number;
  document: string;
  data: ICardDetail[];
}

export const CnpjForm = ({
  cnpj,
  refresh,
  isOpen,
  onOpen,
  onClose,
}: ICnpjForm) => {
  const params = useParams();

  const { request, processing } = useApi({
    path: `/task/${params.id}`,
  });

  const toast = useToast();

  const handleSubmit = (values: any) => {
    if (processing) return;

    if (cnpj) {
      request({
        method: "put",
        pathParameters: "/edit-info",
        body: values,
      })
        .then(() => {
          toast({
            description:
              "Cenário antes da Integracomm atualizado com sucesso!!",
            status: "success",
          });
          onClose();
          refresh();
        })
        .catch((error) => {
          toast({
            description: "Erro ao atualizar cenário!",
            status: "error",
          });
        });
      return;
    }

    request({
      method: "post",
      pathParameters: "/create-info",
      body: { ...values, id: new Date().getTime() },
    })
      .then(() => {
        toast({
          description: "Novo CNPJ criado com sucesso!!",
          status: "success",
        });
        onClose();
        refresh();
      })
      .catch((error) => {
        toast({
          description: "Erro ao criar cenário!",
          status: "error",
        });
      });
  };

  return (
    <Drawer
      title={cnpj ? "Editar CNPJ" : "Adicionar um novo CNPJ"}
      formValidationFields={createCnpj}
      formValues={cnpj}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      processing={processing}
    >
      <Drawer.DrawerInput title="CNPJ" name="document" />
      <Drawer.DrawerArrayInput
        title="Adicionar vendas por marketplace antes da integracomm"
        name="data"
        label="Marketplace"
        value="Valor R$"
      />
      <Drawer.DrawerArrayInput
        title="Tiny - Adicionar Chaves APIs"
        name="api"
        label="Plataforma"
        value="Chave API"
        placeholder="Tiny"
      />
    </Drawer>
  );
};
