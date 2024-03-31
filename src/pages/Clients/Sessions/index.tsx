import { Flex } from "@chakra-ui/react";
import { GenericPage } from "../../../components/GenericPage";
import { MessagesModal } from "../../../components/MessagesModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../../env";
import { useParams } from "react-router-dom";

export const Sessions = () => {
  const [sessions, setSessions] = useState<any>([]);
  const [concludedTask, setConcludedTask] = useState<any>();

  const params = useParams();

  const taskId = params?.id;

  const fetchConcludedSubtasks = (queryStringParameters?: any) => {
    const urlLink = url.ENDPOINT + "/clients/tasks/" + taskId;
    axios
      .get(urlLink, {
        params: {
          taskStatus: "true",
          ...(queryStringParameters || {}),
        },
      })
      .then((response: any) => {
        setConcludedTask(JSON.parse(response.data.body || "[]"));
      })
      .catch((err: any) => console.log(err));
  };

  const getSessionsHistory = () => {
    axios
      .get(
        url.ENDPOINT +
          `/client/sessions?phone=${concludedTask?.phone}&name=${concludedTask?.name}`
      )
      .then((response) => {
        const parsedResponse = JSON.parse(response.data.body);
        setSessions(parsedResponse);
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
          show={true}
          handleClose={function () {
            throw new Error("Function not implemented.");
          }}
          sessions={sessions || []}
        />
      </Flex>
    </GenericPage>
  );
};
