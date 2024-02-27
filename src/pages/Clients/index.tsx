import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { url } from "../../env";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ButtonShowDetails,
  ColumnsDivs,
  ContainerLegend,
  Footer,
  LoadingDiv,
  MainDiv,
  MenuContainer,
  Span,
  Task,
  TasksContainer,
  TextBox,
  Title,
} from "./styles";
import { IoIosArrowDown, IoIosArrowUp, IoIosRefresh } from "react-icons/io";
import { LoadingSpinner } from "../../components/LoadingSpinning";
import { CardDetails } from "../../components/CardDetails";
import { UserContext } from "../../App";

import { MessagesModal } from "../../components/MessagesModal";

import {
  FaChevronRight,
  FaChevronLeft,
  FaSortAmountDown,
} from "react-icons/fa";
import { Button } from "../Home/styles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DatePickerComponent } from "../../components/DatePickerComponent";

export const Clients = () => {
  const location = useLocation();

  const taskId = location.pathname.split("/")[2];

  const subtasksQuantityperPage = 20;

  const [shouldReverseOrder, setShouldReverseOrder] = useState<boolean>(false);

  const [subtasksQuantityToDisplay, setSubtasksQuantityToDisplay] =
    useState<number>(20);

  const [showSessionHistory, setShowSessionHistory] = useState<boolean>(false);
  const [sessions, setSessions] = useState<any>([]);
  const [processing, setProcessing] = useState<{
    concluded: boolean;
    ongoing: boolean;
    session: boolean;
    subtask: boolean;
  }>({
    concluded: false,
    ongoing: false,
    session: false,
    subtask: false,
  });
  const [task, setTask] = useState<any>();

  const [concludedTask, setConcludedTask] = useState<any>();
  const [onGoingTask, setOnGoingTask] = useState<any>();

  const [subtaskDetail, setSubtaskDetail] = useState<any>();
  const [showDetails, setShowDetails] = useState<any>({ id: "", status: "" });
  const { setUpdate, update } = useContext(UserContext);

  const getSessionsHistory = () => {
    setProcessing({ ...processing, session: true });
    axios
      .get(
        url.ENDPOINT +
          `/client/sessions?phone=${concludedTask?.phone}&name=${concludedTask?.name}`
      )
      .then((response) => {
        const parsedResponse = JSON.parse(response.data.body);
        setSessions(parsedResponse);
        setProcessing({ ...processing, session: false });
      })
      .catch((err: any) => console.log(err));
  };

  const fetchSubtask = (subtaskId: string) => {
    const urlLink = url.ENDPOINT + "/clients/tasks/" + subtaskId;
    setProcessing({ ...processing, subtask: true });
    axios
      .get(urlLink, { params: { dev: true } })
      .then((response: any) => {
        setSubtaskDetail(JSON.parse(response.data.body));
        setProcessing({ ...processing, subtask: false });
      })
      .catch((err: any) => console.log(err));
  };

  const fetchConcludedSubtasks = (queryStringParameters?: any) => {
    setProcessing({ ...processing, concluded: true });
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
      .catch((err: any) => console.log(err))
      .finally(() => setProcessing({ ...processing, concluded: false }));
  };

  const fetchOngoingSubtasks = () => {
    setProcessing({ ...processing, ongoing: true });
    const urlLink = url.ENDPOINT + "/clients/tasks/" + taskId;
    axios
      .get(urlLink, { params: { dev: true } })
      .then((response: any) => {
        setOnGoingTask(JSON.parse(response.data.body || "[]"));
        setProcessing({ ...processing, ongoing: false });
      })
      .catch((err: any) => console.log(err));
  };

  const handleOrder = () => {
    setShouldReverseOrder((prev) => !prev);
  };

  useEffect(() => {
    fetchConcludedSubtasks(shouldReverseOrder ? { reverseOrder: "true" } : {});
  }, [shouldReverseOrder]);

  const handleExpand = (index: number, status: string, taskId: any) => {
    if (showDetails.id === index && showDetails.status === status) {
      setShowDetails({});
    } else {
      setShowDetails({ id: index, status: status });
      fetchSubtask(taskId);
    }
  };

  useEffect(() => {
    fetchOngoingSubtasks();
    setUpdate(true);
  }, []);

  useEffect(() => {
    if (!!concludedTask) {
      getSessionsHistory();
    }
  }, [concludedTask]);

  const handleShowSessionsHistory = () => {
    setShowSessionHistory(!showSessionHistory);
  };

  const handleNextPage = () => {
    if (subtasksQuantityToDisplay <= concludedTask?.subtasks?.length) {
      setSubtasksQuantityToDisplay((prev) => prev + subtasksQuantityperPage);
    }
  };

  const handlePreviousPage = useCallback(() => {
    if (subtasksQuantityToDisplay > 20) {
      setSubtasksQuantityToDisplay((prev) => prev - subtasksQuantityperPage);
    }
  }, [subtasksQuantityToDisplay]);

  const concludedTaskMemo = useMemo(() => {
    return concludedTask?.subtasks.slice(
      subtasksQuantityToDisplay - subtasksQuantityperPage,
      subtasksQuantityToDisplay
    );
  }, [concludedTask, subtasksQuantityToDisplay]);

  return (
    <>
      <MainDiv>
        <TextBox>
          <div>{concludedTask?.name}</div>
        </TextBox>
        <ColumnsDivs>
          <div>
            <Title>TAREFAS PENDENTES</Title>
            <MenuContainer></MenuContainer>
            <TasksContainer>
              {processing.ongoing ? (
                <LoadingDiv>
                  <LoadingSpinner />
                </LoadingDiv>
              ) : (
                <>
                  <Task>
                    <div className="date">
                      <label>PREVISTO</label>
                    </div>
                  </Task>
                  {onGoingTask?.subtasks.map((item: any, index: number) => (
                    <>
                      <Task
                        key={index}
                        onClick={() =>
                          handleExpand(index, "unconcluded", item.id)
                        }
                      >
                        <div>
                          <Span color={item.status.color}>
                            <div></div>
                          </Span>
                          <label>{item.name.toUpperCase()}</label>
                        </div>

                        <div>
                          <label>
                            {item.due_date
                              ? new Intl.DateTimeFormat("pt-BR").format(
                                  item.due_date
                                )
                              : "-"}
                          </label>
                        </div>
                      </Task>
                      {showDetails.id === index &&
                        showDetails.status === "unconcluded" && (
                          <CardDetails
                            details={subtaskDetail}
                            processing={processing.subtask}
                          ></CardDetails>
                        )}
                    </>
                  ))}
                </>
              )}
            </TasksContainer>
          </div>
          <div>
            <Title>TAREFAS CONCLUÍDAS</Title>
            <MenuContainer>
              <OverlayTrigger
                overlay={
                  <div
                    style={{
                      background: "black",
                      borderRadius: "5px",
                      color: "white",
                      padding: "2px",
                    }}
                  >
                    Atualizar
                  </div>
                }
              >
                <button onClick={fetchConcludedSubtasks}>
                  <IoIosRefresh />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={
                  <div
                    style={{
                      background: "black",
                      borderRadius: "5px",
                      color: "white",
                      padding: "2px",
                    }}
                  >
                    Ordenar Data
                  </div>
                }
              >
                <button
                  onClick={handleOrder}
                  style={{
                    background: shouldReverseOrder
                      ? "lightgray"
                      : "transparent",
                  }}
                >
                  <FaSortAmountDown size={13} />
                </button>
              </OverlayTrigger>

              <DatePickerComponent request={fetchConcludedSubtasks} />
            </MenuContainer>
            <TasksContainer>
              {processing.concluded || processing.ongoing ? (
                <LoadingDiv>
                  <LoadingSpinner />
                </LoadingDiv>
              ) : (
                <>
                  <Task>
                    <div className="date">
                      <label>CONCLUÍDO</label>
                    </div>
                  </Task>
                  {concludedTaskMemo?.length ? (
                    concludedTaskMemo
                      ?.filter((sub: any) => sub.status.status === "concluído")
                      .map((item: any, index: number) => (
                        <>
                          <Task
                            key={index}
                            onClick={() =>
                              handleExpand(index, "concluded", item.id)
                            }
                          >
                            <div>
                              <Span color={item.status.color}>
                                <div></div>
                              </Span>
                              <label>{item.name.toUpperCase()}</label>
                            </div>
                            <div>
                              <label>
                                {new Intl.DateTimeFormat("pt-BR").format(
                                  item.date_updated
                                )}
                              </label>
                            </div>
                          </Task>
                          {showDetails.id === index &&
                            showDetails.status === "concluded" && (
                              <CardDetails
                                details={subtaskDetail?.data}
                                processing={processing.subtask}
                              ></CardDetails>
                            )}
                        </>
                      ))
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "lightgray",
                        fontWeight: 700,
                      }}
                    >
                      Sem tarefas
                    </div>
                  )}
                  <Footer>
                    <button
                      onClick={handlePreviousPage}
                      disabled={subtasksQuantityToDisplay === 20}
                    >
                      <FaChevronLeft />
                    </button>

                    <button
                      onClick={handleNextPage}
                      disabled={
                        subtasksQuantityToDisplay >=
                        concludedTask?.subtasks?.length
                      }
                    >
                      <FaChevronRight />
                    </button>
                  </Footer>
                </>
              )}
            </TasksContainer>
          </div>
        </ColumnsDivs>
        <Button onClick={() => handleShowSessionsHistory()}>
          ATENDIMENTOS
        </Button>
        <ContainerLegend>
          <label>LEGENDA</label>
          {concludedTask?.legend?.map((item: any, index: number) => (
            <div key={index}>
              <Span color={item.color}>
                <div></div>
              </Span>
              {item.status}
            </div>
          ))}
        </ContainerLegend>

        {showSessionHistory && (
          <MessagesModal
            show={showSessionHistory}
            handleClose={() => setShowSessionHistory(false)}
            sessions={sessions}
          />
        )}
      </MainDiv>
    </>
  );
};
