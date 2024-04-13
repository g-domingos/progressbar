import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { url } from "../../env";
import { Circle } from "../Home/styles";
import {
  Button,
  ClientCard,
  ClientsPannel,
  Container,
  Main,
  Painnel,
  SearchBar,
  TaskDetails,
  TaskDetailsBar,
} from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { error, success } from "../../toast";
import { LoadingDiv } from "../Clients/styles";
import { LoadingSpinner } from "../../components/LoadingSpinning";
import { Login } from "../Login";
import { UserContext } from "../../App";

export const Backoffice = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const [expandClients, setExpandClients] = useState<boolean>(false);

  const [statuses, setStatuses] = useState<any>();
  const [clientsList, setClientsList] = useState<any>();
  const [clientsAssessory, setClientsAssessory] = useState<any>();
  const [expandClientsAssessory, setExpandClientsAssessory] =
    useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");

  const { setUpdate, update } = useContext(UserContext);

  const getStatusesList = () => {
    setProcessing(true);
    axios
      .get(url.ENDPOINT + "/statuses")
      .then((response) => {
        setStatuses(response.data.body);
        setProcessing(false);
      })
      .catch((err: any) => {
        console.log(err);
        setProcessing(false);
        error("Erro ao carregar informações!");
      });
  };

  const handleChangeDuration = ({ taskDuration, id, event }: any) => {
    const currentTask = statuses?.filter(
      (item: any) => item.orderindex === id
    )[0];

    currentTask.duration = +event.target.value;

    const statusesWithoutCurrentTask = statuses?.filter(
      (item: any) => item.orderindex !== id
    );

    setStatuses(
      [...statusesWithoutCurrentTask, currentTask].sort(
        (a: any, b: any) => a.orderindex - b.orderindex
      )
    );
  };

  const handleClientResponsabilitie = ({ e, id }: any) => {
    const currentTask = statuses?.filter(
      (item: any) => item.orderindex === id
    )[0];

    const statusesWithoutCurrentTask = statuses?.filter(
      (item: any) => item.orderindex !== id
    );

    currentTask.client_responsabilitie =
      e.target.name === "true" ? true : false;

    setStatuses(
      [...statusesWithoutCurrentTask, currentTask].sort(
        (a: any, b: any) => a.orderindex - b.orderindex
      )
    );
  };

  const handleIsTaskVisibleForClient = ({ e, id }: any) => {
    const currentTask = statuses?.filter(
      (item: any) => item.orderindex === id
    )[0];

    const statusesWithoutCurrentTask = statuses?.filter(
      (item: any) => item.orderindex !== id
    );

    currentTask.visible = e.target.name === "true" ? true : false;

    setStatuses(
      [...statusesWithoutCurrentTask, currentTask].sort(
        (a: any, b: any) => a.orderindex - b.orderindex
      )
    );
  };

  const handleUpdateTaskInformation = () => {
    axios
      .put(url.ENDPOINT + "/statuses", statuses)
      .then((response) => {
        getStatusesList();
        setExpand(false);
        success("Configurações salvas com sucesso!");
      })
      .catch((err: any) => {
        console.log(err);
        setProcessing(false);
        error("Erro ao carregar informações!");
      });
  };

  const getClientLinks = () => {
    axios
      .get(url.ENDPOINT + "/clients-links")
      .then((response) => {
        setClientsList(
          response?.data.body.sort((a: any, b: any) =>
            a.clientName.localeCompare(b.clientName)
          )
        );
      })
      .catch((err: any) => {
        console.log(err);
        setProcessing(false);
        error("Erro ao carregar informações!");
      });
  };

  const handleFilter = (name: string) => {
    setSearchName(name.toLowerCase());
  };

  const dataArrayMemo = useMemo(() => {
    if (searchName.length && expandClientsAssessory) {
      return clientsAssessory.filter((item: any) =>
        item.name.toLowerCase().includes(searchName)
      );
    }

    return clientsAssessory;
  }, [searchName, clientsAssessory]);

  const implantationMemo = useMemo(() => {
    if (searchName.length && expandClients) {
      return clientsList.filter((item: any) =>
        item.clientName.toLowerCase().includes(searchName)
      );
    }

    return clientsList;
  }, [searchName, clientsList]);

  useEffect(() => {
    getStatusesList();
    getClientLinks();
    setUpdate(true);
  }, []);

  const handleOpenDash = ({ taskId, isAssessory }: any) => {
    const currentUrl = window.location.href;

    const url = currentUrl.split("#")[0];

    let goToUrl = url + `#/client-id/${taskId}`;

    if (isAssessory) {
      goToUrl = url + `#/clients/${taskId}`;
    }

    window.open(goToUrl);
  };
  return (
    <Container>
      {processing && (
        <LoadingDiv>
          <LoadingSpinner />
        </LoadingDiv>
      )}
      <Main>
        <label>Backoffice Progressbar</label>
        <TaskDetails>
          <TaskDetailsBar onClick={() => setExpand(!expand)}>
            {!expand ? <IoIosArrowDown /> : <IoIosArrowUp />}
            <label>CONFIGURAÇÕES DAS TAREFAS</label>
          </TaskDetailsBar>
          {expand && (
            <>
              {statuses
                ?.filter((task: any) => !task.dontShow)
                .map((task: any, index: number) => (
                  <div key={index}>
                    <span>
                      <Circle opaco>{task?.orderindex}</Circle>
                    </span>
                    <div>
                      <label>TAREFA</label>
                      <p>{task?.statusName?.toUpperCase()}</p>
                    </div>
                    <div>
                      <label>DURAÇÃO DA TAREFA</label>
                      <div>
                        <input
                          min="0"
                          max="100"
                          step="1"
                          pattern="\d*"
                          type="number"
                          value={task?.duration}
                          onChange={(e) =>
                            handleChangeDuration({
                              taskDuration: task.duration,
                              id: index,
                              event: e,
                            })
                          }
                        />
                        <p>dias</p>
                      </div>
                    </div>
                    <div>
                      <label>RESP. DO CLIENTE</label>
                      <div>
                        <input
                          type="checkbox"
                          name="true"
                          checked={task.client_responsabilitie}
                          onChange={(e) =>
                            handleClientResponsabilitie({ e, id: index })
                          }
                        />
                        <p>Sim</p>
                        <input
                          type="checkbox"
                          name="false"
                          checked={!task.client_responsabilitie}
                          onChange={(e) =>
                            handleClientResponsabilitie({ e, id: index })
                          }
                        />
                        <p>Não</p>
                      </div>
                    </div>
                    <div>
                      <label>VISÍVEL</label>
                      <div>
                        <input
                          type="checkbox"
                          checked={task.visible}
                          name="true"
                          onChange={(e) =>
                            handleIsTaskVisibleForClient({ e, id: index })
                          }
                        />
                        <p>Sim</p>
                        <input
                          type="checkbox"
                          checked={!task.visible}
                          name="false"
                          onChange={(e) =>
                            handleIsTaskVisibleForClient({ e, id: index })
                          }
                        />
                        <p>Não</p>
                      </div>
                    </div>
                  </div>
                ))}
              <Button onClick={() => handleUpdateTaskInformation()}>
                SALVAR
              </Button>
            </>
          )}
        </TaskDetails>
        <ClientsPannel>
          <div
            onClick={() => {
              setExpandClients(!expandClients);
              setSearchName("");
              setExpandClientsAssessory(false);
            }}
          >
            {!expandClients ? <IoIosArrowDown /> : <IoIosArrowUp />}
            <label>IMPLANTAÇÃO</label>
          </div>
        </ClientsPannel>

        {expandClients && (
          <>
            <SearchBar>
              <input
                onChange={(e) => handleFilter(e.target.value)}
                placeholder="Pesquisar..."
                autoFocus
              />
            </SearchBar>
            <Painnel>
              {implantationMemo?.map((client: any) => (
                <ClientCard
                  onClick={() => handleOpenDash({ taskId: client.taskId })}
                >
                  <label>{client?.clientName}</label>
                  <div>
                    <span>{client?.status?.status.toUpperCase()}</span>
                  </div>
                </ClientCard>
              ))}
            </Painnel>
          </>
        )}
      </Main>
    </Container>
  );
};
