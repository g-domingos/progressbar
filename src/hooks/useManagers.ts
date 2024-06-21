import { useEffect, useState } from "react";
import { IManagers } from "../types/types";
import { useApi } from "./useApi";
import { useToast } from "@chakra-ui/react";

export const useManagers = () => {
  const [managers, setManagers] = useState<IManagers[]>([]);

  const toast = useToast();

  const { request, processing } = useApi({
    path: "/settings/managers",
  });

  const getManagers = (taskId?: string) => {
    const pathParameters = taskId ? `${taskId}` : "";

    request({
      method: "get",
      pathParameters,
    }).then((response) => {
      setManagers(response?.managers || []);
    });
  };

  const saveManagers = async (values: IManagers) => {
    return request({
      method: "post",
      body: values,
    });
  };

  const updateManager = async (values: IManagers) => {
    return request({
      method: "put",
      body: values,
      pathParameters: `/${values.id}`,
    });
  };

  const assignTaskToManager = ({
    taskId,
    body,
  }: {
    taskId: string;
    body: {
      managerId: number;
      managerName: string;
    } | null;
  }) => {
    return request({
      method: "put",
      pathParameters: `/${body?.managerId}/assign`,
      body: { ...body, taskId },
    });
  };

  const deleteManager = ({ managerId }: { managerId: number }) => {
    return request({ method: "del", pathParameters: `/${managerId}` });
  };

  return {
    managers,
    getManagers,
    setManagers,
    processing,
    assignTaskToManager,
    saveManagers,
    deleteManager,
    updateManager,
  };
};
