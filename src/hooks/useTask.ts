import { useState } from "react";
import { IInfo } from "../components/CnpjForm";
import { useApi } from "./useApi";

export const useTask = () => {
  const [taskInfo, setTaskInfo] = useState<any>();

  const { request, processing } = useApi({ path: `/task` });

  const fetch = (taskId: string) => {
    request({ method: "get", pathParameters: `/${taskId}/info` }).then(
      (response: any) => {
        const sorted = response?.info?.sort(
          (a: IInfo, b: IInfo) => a.id - b.id
        );

        setTaskInfo(sorted);
      }
    );
  };

  return {
    taskInfo,
    fetch,
    processing,
  };
};
