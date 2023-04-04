import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../env";
import { Circle } from "../Home/styles";
import { Button, Container, Main, TaskDetails, TaskDetailsBar } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { success } from "../../toast";

export const Backoffice = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);

  const [statuses, setStatuses] = useState<any>();

  const getStatusesList = () => {
    setProcessing(true);
    axios
      .get(url.ENDPOINT + "/statuses")
      .then((response) => {
        setStatuses(response.data.body);
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  const handleChangeDuration = ({ taskDuration, id, event }: any) => {
    const currentTask = statuses.filter(
      (item: any) => item.orderindex === id
    )[0];

    currentTask.duration = +event.target.value;

    const statusesWithoutCurrentTask = statuses.filter(
      (item: any) => item.orderindex !== id
    );

    setStatuses(
      [...statusesWithoutCurrentTask, currentTask].sort(
        (a: any, b: any) => a.orderindex - b.orderindex
      )
    );
  };

  const handleClientResponsabilitie = ({ e, id }: any) => {
    const currentTask = statuses.filter(
      (item: any) => item.orderindex === id
    )[0];

    const statusesWithoutCurrentTask = statuses.filter(
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
    const currentTask = statuses.filter(
      (item: any) => item.orderindex === id
    )[0];

    const statusesWithoutCurrentTask = statuses.filter(
      (item: any) => item.orderindex !== id
    );

    currentTask.visible = e.target.name === "true" ? true : false;

    setStatuses(
      [...statusesWithoutCurrentTask, currentTask].sort(
        (a: any, b: any) => a.orderindex - b.orderindex
      )
    );
  };

  console.log("statuses", statuses);

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
      });
  };

  useEffect(() => {
    getStatusesList();
  }, []);

  return (
    <Container>
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
                      <p>{(task?.status).toUpperCase()}</p>
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
                          onKeyDown={(e) => console.log(e.key)}
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
      </Main>
    </Container>
  );
};
