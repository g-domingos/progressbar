import { MdAudiotrack } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { IoReturnUpBack } from "react-icons/io5";
import {
  AgentsContainer,
  Container,
  ConversationContainer,
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
import { format, parseISO } from "date-fns";
import { BsFillFileImageFill } from "react-icons/bs";
import { LoadingSpinner } from "../LoadingSpinning";
import { NoData } from "../../pages/Home/styles";
import { CiCloudOff } from "react-icons/ci";

interface MessagesModalInterface {
  show: boolean;
  handleClose: () => any;
  sessions: any[];
}

export const MessagesModal = ({
  show,
  handleClose,
  sessions,
}: MessagesModalInterface) => {
  const [messages, setMessages] = useState<any>();
  const [processing, setProcessing] = useState<boolean>(false);

  const ref = useRef<any>();

  function formatDate(inputDate: string) {
    const parsedDate = parseISO(inputDate);
    const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm");
    return formattedDate;
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  };

  const getMessagesFromSession = ({
    created_at,
    session_id,
    finished_at,
  }: {
    created_at: string;
    session_id: string;
    finished_at: string;
  }) => {
    setProcessing(true);
    axios
      .get(
        url.ENDPOINT +
          `/client/sessions/messages?created_at=${created_at}&session_id=${session_id}&finished_at=${finished_at}`
      )
      .then((response) => {
        setMessages(JSON.parse(response.data.body));
      })
      .catch((err: any) => console.log(err))
      .finally(() => setProcessing(false));
  };

  const renderMessageContent = (type: string, message: string) => {
    switch (type) {
      case "sounds":
        return <MdAudiotrack />;
      case "images":
        return <BsFillFileImageFill />;
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
    <Modal show={show} size="xl">
      <Container ref={ref}>
        <label>Histórico de Atendimento</label>
        {!!sessions?.length ? (
          <AgentsContainer>
            <LeftSide>
              {sessions.map((item, index) => (
                <Employee
                  selected={employeeSelected.name === item.name}
                  onClick={() => {
                    setEmployeeSelected(item);
                    setMessages("");
                  }}
                >
                  {item.name}
                </Employee>
              ))}
            </LeftSide>
            {processing ? (
              <LoadingDiv>
                <LoadingSpinner />
              </LoadingDiv>
            ) : (
              <RightSide>
                {!messages?.original?.length ? (
                  employeeSelected?.result.map((msgs: any) => (
                    <Sessions
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
                      {formatDate(messages?.original?.[0].created_at) || ""}
                      <button onClick={() => setMessages([])}>
                        <IoReturnUpBack size={20} />
                      </button>
                    </Header>
                    {messages?.original.map((msg: any) => (
                      <MessageContainer isClient={msg.origin === "channel"}>
                        <Message isClient={msg.origin === "channel"}>
                          {renderMessageContent(msg.type, msg.message)}
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
            <CiCloudOff size={40}/>
            <label>Não há dados a serem mostrados</label>
          </Empty>
        )}
      </Container>
    </Modal>
  );
};
