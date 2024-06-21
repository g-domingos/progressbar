import { RiDownloadCloud2Line } from "react-icons/ri";
import { IoReturnUpBack } from "react-icons/io5";
import {
  AgentsContainer,
  Container,
  DownloadButton,
  Employee,
  Empty,
  Header,
  LeftSide,
  LoadingDiv,
  Message,
  MessageContainer,
  RightSide,
  Sessions,
} from "./styles";
import axios from "axios";
import { url } from "../../env";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinning";
import { CiCloudOff } from "react-icons/ci";
import { useApi } from "../../hooks/useApi";
import { Flex, Spinner } from "@chakra-ui/react";

interface MessagesModalInterface {
  show: boolean;
  sessions: any[];
  processingSession?: boolean;
}

export const MessagesModal = ({
  show,
  sessions,
  processingSession
}: MessagesModalInterface) => {
  const [messages, setMessages] = useState<any>();

  const ref = useRef<any>();

  const { request, processing } = useApi({ path: `` })

  function formatDate(inputDate: string) {
    return new Date(inputDate).toLocaleString();
  }


  const getMessagesFromSession = ({
    created_at,
    session_id,
    finished_at,
  }: {
    created_at: string;
    session_id: string;
    finished_at: string;
  }) => {
    request({ method: "get", pathParameters: `/client/sessions/messages?created_at=${created_at}&session_id=${session_id}&finished_at=${finished_at}` }).then((response) => {
      setMessages(response);
    })
      .catch((err: any) => console.log(err))
  };

  const renderMessageContent = (
    type: string,
    message: string,
    storage_id?: string
  ) => {
    switch (type) {
      case "sounds":
        return (
          <audio
            preload="auto"
            controls
            src={
              "https://integracomm.syngoo-talk.app/config/storage/view/" +
              storage_id
            }
          />
        );
      case "images":
        return (
          <img
            src={
              "https://integracomm.syngoo-talk.app/config/storage/view/" +
              storage_id
            }
          />
        );

      case "files":
        return (
          <DownloadButton
            onClick={() =>
              window.open(
                "https://integracomm.syngoo-talk.app/config/storage/view/" +
                storage_id,
                "_blank"
              )
            }
          >
            <RiDownloadCloud2Line size={25} />
            <label style={{ fontWeight: 500 }}>Arquivo</label>
          </DownloadButton>
        );
      default:
        return <label>{message}</label>;
    }
  };

  const [employeeSelected, setEmployeeSelected] = useState({
    phone: "",
    name: "",
    index: "",
    id: "",
    result: [],
  });

  return (
    <Container ref={ref}>
      {processingSession ? <Flex><Spinner /></Flex> :



        <>

          <label>Histórico de Atendimento</label>
          {!!sessions?.length ? (
            <AgentsContainer>
              <LeftSide>
                {(sessions || [])?.map((item, index) => (
                  <Employee
                    key={index}
                    selected={employeeSelected.name === item.name}
                    onClick={() => {
                      setEmployeeSelected(item);
                      setMessages("");
                    }}
                  >
                    <label>{item.name}</label>
                  </Employee>
                ))}
              </LeftSide>
              {processing ? (
                <LoadingDiv>
                  <LoadingSpinner />
                </LoadingDiv>
              ) : (
                <RightSide>
                  {!messages?.length ? (
                    employeeSelected?.result?.map((msgs: any, index: number) => (
                      <Sessions
                        key={index}
                        onClick={() => getMessagesFromSession({ ...msgs })}
                      >
                        <strong>{formatDate(msgs?.created_at)}</strong>- Atendente
                        Integracomm : {(msgs?.agent_name || "").toUpperCase()}
                      </Sessions>
                    ))
                  ) : (
                    <>
                      <Header>
                        Mensagens da Sessão -{" "}
                        {formatDate(messages?.[0].created_at) || ""}
                        <button onClick={() => setMessages([])}>
                          <IoReturnUpBack size={20} />
                        </button>
                      </Header>
                      {messages?.map((msg: any, index: number) => (
                        <MessageContainer
                          isClient={msg.origin === "channel"}
                          key={index}
                        >
                          <Message isClient={msg.origin === "channel"}>
                            {renderMessageContent(
                              msg.type,
                              msg.message,
                              msg.storage_id
                            )}
                            <span>{formatDate(msg.created_at)}</span>
                          </Message>
                        </MessageContainer>
                      ))}
                    </>
                  )}
                </RightSide>
              )}
            </AgentsContainer>
          ) : (
            <Empty>
              <CiCloudOff size={40} />
              <label>Não há dados a serem mostrados</label>
            </Empty>
          )}
        </>
      }
    </Container>
  );
};
