import { MdAudiotrack } from "react-icons/md";
import { Modal } from "react-bootstrap";
import {
  Container,
  ConversationContainer,
  Message,
  MessageContainer,
} from "./styles";
import axios from "axios";
import { url } from "../../env";
import { useEffect, useRef, useState } from "react";
import { format, parseISO } from "date-fns";
import { BsFillFileImageFill } from "react-icons/bs";

interface MessagesModalInterface {
  session_id: string;
  created_at: string;
  finished_at: string;
  show: boolean;
  handleClose: () => any;
  date?: string;
}

export const MessagesModal = ({
  session_id,
  show,
  handleClose,
  date,
  finished_at,
  created_at,
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

  const getMessagesFromSession = () => {
    axios
      .get(
        url.ENDPOINT +
          `/client/sessions/messages?created_at=${created_at}&session_id=${session_id}&finished_at=${finished_at}`
      )
      .then((response) => {
        setMessages(JSON.parse(response.data.body));
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getMessagesFromSession();
  }, []);

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

  console.log(messages);

  return (
    <Modal show={show} size="lg">
      <Container ref={ref}>
        <label>Atendimento - {formatDate(created_at)}</label>
        <ConversationContainer>
          {messages?.original.map((msg: any) => (
            <MessageContainer isClient={msg.origin === "channel"}>
              <Message isClient={msg.origin === "channel"}>
                {renderMessageContent(msg.type, msg.message)}
                <span>{formatDate(msg.created_at)}</span>
              </Message>
            </MessageContainer>
          ))}
        </ConversationContainer>
      </Container>
    </Modal>
  );
};
