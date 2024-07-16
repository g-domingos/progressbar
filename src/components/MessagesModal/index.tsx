import { RiDownloadCloud2Line } from "react-icons/ri";
import { IoReturnUpBack, IoSearch } from "react-icons/io5";
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

import { useRef, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinning";
import { CiCloudOff } from "react-icons/ci";
import { useApi } from "../../hooks/useApi";
import { Button, Flex, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface MessagesModalInterface {
  show: boolean;
  sessions: any[];
  processingSession?: boolean;
}

export const MessagesModal = ({
  show,
  sessions,
  processingSession,
}: MessagesModalInterface) => {
  const [messages, setMessages] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [allMessagesContainingSearchedValue, setAllMessagesContaining] =
    useState<any[]>([]);

  const [isSearchMode, setSearchMode] = useState<boolean>(false);

  const DEFAULT_PROCESSING_ALL_MESSAGES = {
    status: false,
    currentPage: 0,
    totalPages: 0,
  };

  const [processingAllMessages, setProcessingAllMessages] = useState<{
    status: boolean;
    currentPage: number;
    totalPages: number;
  }>(DEFAULT_PROCESSING_ALL_MESSAGES);

  const ref = useRef<any>();

  const toast = useToast();

  const { request, processing } = useApi({ path: `` });

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
    return request({
      method: "get",
      pathParameters: `/client/sessions/messages?created_at=${created_at}&session_id=${session_id}&finished_at=${finished_at}`,
    });
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

  const containerRef = useRef<any>(null);

  const [messageIndexFound, setMessageIndexFound] = useState<number>(0);

  const handleSearch = (searchValue: any) => {
    const allMessages = messages.filter((item: any) =>
      item?.message?.toLowerCase().includes(searchValue)
    );

    if (!allMessages.length) {
      toast({ description: "Não encontrado", status: "info" });
    }

    setAllMessagesContaining(allMessages);

    const firstCorrespondingMessage = allMessages[0];
    setMessageIndexFound(0);

    //Ir direto para a primeira mensagem encontrada:
    scrollToMessage(firstCorrespondingMessage.message_id);
  };

  const scrollToMessage = (elementId: string) => {
    const targetElement = containerRef.current.querySelector(`#a${elementId}`);

    if (targetElement) {
      changeMessageContainerBorder(elementId, "3px solid black");
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeMessageContainerBorder = (
    elementId: string,
    newBorderStyle: string
  ) => {
    const targetElement = containerRef.current.querySelector(`#a${elementId}`);
    targetElement.children[0].style.border = newBorderStyle;
  };

  const onChange = (event: any) => {
    const typedValue = event?.target?.value?.toLowerCase() || "";

    setSearchValue(typedValue);
  };

  const handleSearchDown = () => {
    const currentIndex = messageIndexFound;

    const nextMessage = allMessagesContainingSearchedValue[currentIndex + 1];

    if (nextMessage) {
      //Mudar a borda da mensagem passada para não ficar com varias mensagens selecionadas
      changeMessageContainerBorder(
        allMessagesContainingSearchedValue[currentIndex].message_id,
        "none"
      );

      scrollToMessage(nextMessage.message_id);
      setMessageIndexFound(currentIndex + 1);
    }
  };

  const handleSearchUp = () => {
    const currentIndex = messageIndexFound;

    const previousMessage =
      allMessagesContainingSearchedValue[currentIndex - 1];

    if (previousMessage) {
      //Mudar a borda da mensagem passada para não ficar com varias mensagens selecionadas
      changeMessageContainerBorder(
        allMessagesContainingSearchedValue[currentIndex].message_id,
        "none"
      );

      scrollToMessage(previousMessage.message_id);
      setMessageIndexFound(currentIndex - 1);
    }
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch(searchValue);
    }

    if (event.key === "Backspace") {
      resetAllBorderColors();
    }
  };

  const resetAllBorderColors = () => {
    messages.map(({ message_id }: { message_id: string }) =>
      changeMessageContainerBorder(message_id, "none")
    );
  };

  const returnToSessionsList = () => {
    setMessages([]);
    handleCloseSearchMode();
  };

  const handleCloseSearchMode = () => {
    setSearchMode(false);
    setSearchValue("");
    setAllMessagesContaining([]);
    setMessageIndexFound(0);
    returnToSessionsList();
  };

  const changeToSearchMode = async () => {
    setSearchMode(true);

    //se estiver dentro de uma conversa, irá fazer a pesquisa só naquela conversa.
    if (messages.length) {
      return;
    }

    //Se tiver um funcionário da empresa selecionado, vai pesquisar apenas nas mensagens do funcionário selecionado.
    if (employeeSelected.result.length) {
      setProcessingAllMessages({
        currentPage: 1,
        status: true,
        totalPages: employeeSelected.result.length,
      });

      let messagesArray: any[] = [];

      let cont = 2;
      for (let session of employeeSelected.result) {
        await getMessagesFromSession(session)
          .then((response) => {
            messagesArray = [...(response || []), ...messagesArray];
          })
          .catch((err: any) => console.log(err));

        setProcessingAllMessages({
          currentPage: cont,
          status: true,
          totalPages: employeeSelected.result.length,
        });

        cont += 1;
      }

      setMessages(messagesArray);

      setProcessingAllMessages(DEFAULT_PROCESSING_ALL_MESSAGES);
      return;
    }

    //Se não tiver nenhum funcionário selecionado, irá fazer uma pesquisa em todas as mensagens de todos funcionários.
    //TODO - Caso requisitado pela Integracomm aqui será realizado a lógica.
  };

  return (
    <Container ref={ref}>
      {processingSession ? (
        <Flex>
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            w="100%"
            alignItems={"center"}
            padding="5px 0"
          >
            <Text
              fontWeight={600}
              mb="unset"
            >
              Histórico
            </Text>
            {isSearchMode ? (
              <Flex
                alignItems={"center"}
                boxShadow={"0 0 10px lightgray"}
                background={"white"}
                borderRadius={"6px"}
                padding="5px"
                position={"relative"}
              >
                <Flex position={"relative"}>
                  <Input
                    width="15rem"
                    onChange={onChange}
                    value={searchValue}
                    autoFocus
                    onKeyDown={onKeyDown}
                  />
                </Flex>

                <Button
                  disabled={!employeeSelected.name}
                  opacity={!employeeSelected.name ? "0.6" : ""}
                  onClick={() => handleSearch(searchValue)}
                >
                  <IoSearch size={18} />
                </Button>
                {!!allMessagesContainingSearchedValue.length ? (
                  <Text mb="unset">
                    {messageIndexFound +
                      1 +
                      "/" +
                      allMessagesContainingSearchedValue.length}
                  </Text>
                ) : (
                  <Text mb="unset">-</Text>
                )}
                <Button onClick={handleSearchUp}>
                  <FaChevronUp />
                </Button>
                <Button onClick={handleSearchDown}>
                  <FaChevronDown />
                </Button>
                <Button
                  className="closeButtom"
                  position={"absolute"}
                  background={"white"}
                  right={"-10px"}
                  top={"-10px"}
                  minW={"unset"}
                  width={"25px"}
                  padding="unset"
                  height={"25px"}
                  borderRadius={"100%"}
                  boxShadow={"0 0 10px lightgray"}
                  _hover={{
                    background: "gray",
                  }}
                  onClick={handleCloseSearchMode}
                >
                  <IoMdClose />
                </Button>
              </Flex>
            ) : (
              <Button
                onClick={() => {
                  employeeSelected.name && changeToSearchMode();
                }}
                opacity={!!employeeSelected.name ? "" : "0.5"}
                _hover={{
                  cursor: !!employeeSelected.name ? "pointer" : "not-allowed !important",
                }}
              >
                Pesquisar
              </Button>
            )}
          </Flex>
          {!!sessions?.length ? (
            <AgentsContainer>
              <LeftSide>
                {(sessions || [])?.map((item, index) => (
                  <Employee
                    key={index}
                    selected={employeeSelected.name === item.name}
                    onClick={() => {
                      setEmployeeSelected(item);
                      setMessages([]);
                    }}
                  >
                    <label>{item.name}</label>
                  </Employee>
                ))}
              </LeftSide>
              {processing || processingAllMessages.status ? (
                <LoadingDiv>
                  {processingAllMessages.status ? (
                    <Flex
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Text>
                        Carregando as sessões de mensagens para pesquisar...
                      </Text>
                      <Text>
                        {processingAllMessages.currentPage} de{" "}
                        {processingAllMessages.totalPages}
                      </Text>
                    </Flex>
                  ) : null}
                  <LoadingSpinner />
                </LoadingDiv>
              ) : (
                <RightSide
                  ref={containerRef}
                  id="container"
                >
                  {!messages?.length ? (
                    employeeSelected?.result?.map(
                      (msgs: any, index: number) => (
                        <Sessions
                          key={index}
                          onClick={() =>
                            getMessagesFromSession({ ...msgs })
                              .then((response) => {
                                setMessages([...messages, ...response]);
                              })
                              .catch((err: any) => console.log(err))
                          }
                        >
                          <strong>{formatDate(msgs?.created_at)}</strong>-
                          Atendente Integracomm :{" "}
                          {(msgs?.agent_name || "").toUpperCase()}
                        </Sessions>
                      )
                    )
                  ) : (
                    <>
                      <Header>
                        Mensagens da Sessão -{" "}
                        {formatDate(messages?.[0].created_at) || ""}
                        <button onClick={returnToSessionsList}>
                          <IoReturnUpBack size={20} />
                        </button>
                      </Header>
                      {messages?.map((msg: any, index: number) => (
                        <MessageContainer
                          id={`a${msg?.message_id}`}
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
      )}
    </Container>
  );
};
