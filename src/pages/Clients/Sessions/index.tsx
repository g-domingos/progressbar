import { Flex } from "@chakra-ui/react";
import { GenericPage } from "../../../components/GenericPage";
import { MessagesModal } from "../../../components/MessagesModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../env";
import { useParams } from "react-router-dom";
import { useApi } from "../../../hooks/useApi";

export const Sessions = () => {
  const [sessions, setSessions] = useState<any>([]);
  const [concludedTask, setConcludedTask] = useState<any>();

  const params = useParams();

  const taskId = params?.id;

  const { request, processing } = useApi({ path: "" })

  const fetchConcludedSubtasks = (queryStringParameters?: any) => {


    request({
      method: "get", pathParameters: "/clients/tasks/" + taskId, queryStringParameters: {
        taskStatus: "true",
        ...(queryStringParameters || {}),
      }
    }).then((response: any) => {
      setConcludedTask(response);
    })
      .catch((err: any) => console.log(err));
  };


  const getSessionsHistory = () => {

    request({ method: "get", pathParameters: `/client/sessions?phone=${concludedTask?.phone}&name=${concludedTask?.name}` })
      .then((response) => {
        setSessions(response);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    fetchConcludedSubtasks();
  }, []);

  useEffect(() => {
    if (concludedTask) {
      getSessionsHistory();
    }
  }, [concludedTask]);

  return (
    <GenericPage title={"Atendimentos"}>
      <Flex width={"100%"}>
        <MessagesModal
          processingSession={processing}
          show={true}
          sessions={sessions || []}
        />
      </Flex>
    </GenericPage>
  );
};
