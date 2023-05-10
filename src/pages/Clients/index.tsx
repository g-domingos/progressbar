import { useEffect, useState } from "react";
import { url } from "../../env";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ButtonShowDetails,
  ColumnsDivs,
  Details,
  MainDiv,
  Responsible,
  Span,
  Task,
  TasksContainer,
  TextBox,
  Title,
  Tooltip,
} from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Clients = () => {
  const location = useLocation();

  const taskId = location.pathname.split("/")[2];

  const [processing, setProcessing] = useState<boolean>(false);
  const [task, setTask] = useState<any>();
  const [showTooltip, setShowTooltip] = useState<any>({ id: "", show: true });
  const [showTooltipDone, setShowTooltipDone] = useState<any>({
    id: "",
    show: true,
  });
  const [showDetails, setShowDetails] = useState<any>({ id: "", status: "" });

  const getClientDetails = () => {
    setProcessing(true);
    axios
      .get(url.ENDPOINT + "/clients/tasks/" + taskId)
      .then((response: any) => {
        setTask(JSON.parse(response.data.body || "[]"));
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  const handleExpand = (index: number, status: string) => {
    if (showDetails.id === index && showDetails.status === status) {
      setShowDetails({});
    } else {
      setShowDetails({ id: index, status: status });
    }
  };

  useEffect(() => {
    getClientDetails();
  }, [location]);

  return (
    <MainDiv>
      <TextBox>
        <div>{task?.name}</div>
      </TextBox>
      <ColumnsDivs>
        <div>
          <Title>TAREFAS PENDENTES</Title>
          <TasksContainer>
            <Task>
              <div className="date">
                <label>PREVISTO</label>
              </div>
            </Task>
            {task?.subtasks
              .filter((sub: any) => sub.status.status !== "concluído")
              .map((item: any, index: number) => (
                <>
                  <Task>
                    <div>
                      <Span
                        color={item.status.color}
                        onMouseEnter={() =>
                          setShowTooltipDone({ id: index, show: true })
                        }
                        onMouseLeave={() =>
                          setShowTooltipDone({ id: "", show: false })
                        }
                      >
                        <div></div>
                      </Span>
                      <label>{item.name.toUpperCase()}</label>
                    </div>
                    {showTooltipDone?.id === index && showTooltipDone.show && (
                      <Tooltip>{item.status.status.toUpperCase()}</Tooltip>
                    )}
                    <div>
                      <label>
                        {item.due_date
                          ? new Intl.DateTimeFormat("pt-BR").format(
                              item.due_date
                            )
                          : "-"}
                      </label>
                    </div>
                    <ButtonShowDetails
                      onClick={() => handleExpand(index, "unconcluded")}
                    >
                      {showDetails.id !== index ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowUp />
                      )}
                    </ButtonShowDetails>
                  </Task>
                  {showDetails.id === index &&
                    showDetails.status === "unconcluded" && (
                      <Details>
                        <div>
                          <label>DETALHES</label>
                          <label>
                            {item.assignees.length > 1
                              ? "RESPONSÁVEIS"
                              : "RESPONSÁVEL"}
                          </label>
                        </div>
                        {item.assignees.map((resp: any) => (
                          <Responsible>
                            <img src={resp.profilePicture} />
                            <label>{resp.username}</label>
                          </Responsible>
                        ))}
                      </Details>
                    )}
                </>
              ))}
          </TasksContainer>
        </div>
        <div>
          <Title>TAREFAS CONCLUÍDAS</Title>
          <TasksContainer>
            <Task>
              <div className="date">
                <label>CONCLUÍDO</label>
              </div>
            </Task>
            {task?.subtasks
              .sort((a: any, b: any) => b.date_updated - a.date_updated)
              .filter((sub: any) => sub.status.status === "concluído")
              .map((item: any, index: number) => (
                <>
                  <Task
                  // onMouseEnter={() => setShowDetails(index)}
                  // onMouseLeave={() => setShowDetails("")}
                  >
                    <div>
                      <Span
                        color={item.status.color}
                        onMouseEnter={() =>
                          setShowTooltip({ id: index, show: true })
                        }
                        onMouseLeave={() =>
                          setShowTooltip({ id: "", show: false })
                        }
                      >
                        <div></div>
                      </Span>
                      {/* <img src={item.creator.profilePicture} /> */}
                      <label>{item.name.toUpperCase()}</label>
                    </div>
                    <div>
                      <label>
                        {new Intl.DateTimeFormat("pt-BR").format(
                          item.date_updated
                        )}
                      </label>
                    </div>
                    {showTooltip?.id === index && showTooltip.show && (
                      <Tooltip>{item.status.status.toUpperCase()}</Tooltip>
                    )}
                    <ButtonShowDetails
                      onClick={() => handleExpand(index, "concluded")}
                    >
                      {showDetails.id !== index ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowUp />
                      )}
                    </ButtonShowDetails>
                  </Task>
                  {showDetails.id === index &&
                    showDetails.status === "concluded" && (
                      <Details>
                        <div>
                          <label>DETALHES</label>
                          <label>
                            {item.assignees.length > 1
                              ? "RESPONSÁVEIS"
                              : "RESPONSÁVEL"}
                          </label>
                        </div>
                        {item.assignees.map((resp: any) => (
                          <Responsible>
                            <img src={resp.profilePicture} />
                            <label>{resp.username}</label>
                          </Responsible>
                        ))}
                      </Details>
                    )}
                </>
              ))}
          </TasksContainer>
        </div>
      </ColumnsDivs>
    </MainDiv>
  );
};
