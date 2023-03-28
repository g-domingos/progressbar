import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Button,
  CardTask,
  Circle,
  LabelContainer,
  Legend,
  MainDiv,
  Span,
  SpinnerDiv,
  TaskContainer,
  TaskIsCurrent,
  TextBox,
} from "./styles";

import { BsNut } from "react-icons/bs";
import Spinner from "react-bootstrap/Spinner";
import { isMobile } from "react-device-detect";
import { url } from "../../env";
import { IoIosArrowDown } from "react-icons/io";

export const Home = () => {
  const [apiData, setApiData] = useState<any>();
  const [statuses, setStatuses] = useState<any>();
  const [task, setTask] = useState<any>();
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const [history, setHistory] = useState<any>();

  const location = useLocation();
  const { pathname } = location;

  let taskId = pathname.split("/").slice(2)[0];

  const getHistory = () => {
    axios
      .get(url.ENDPOINT + `/history/${taskId}`)
      .then((response) => {
        setHistory(JSON.parse(response.data.body));
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  const getStatusesList = () => {
    setProcessing(true);
    axios
      .get(url.ENDPOINT + "/statuses")
      .then((response) => {
        setStatuses(JSON.parse(response.data.body));
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  const getStatusByClient = () => {
    axios
      .get(url.ENDPOINT + `/task/${taskId}`)
      .then((response) => {
        setTask(JSON.parse(response.data.body));
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getStatusesList();
    getStatusByClient();
    getHistory();
  }, [pathname]);

  const filteredStatus = statuses?.filter(
    (tasks: any, index: number) =>
      index >= task?.orderIndex - 2 && index <= task?.orderIndex + 2
  );

  const currentTaskDuration = statuses?.filter(
    (item: any) => item.orderindex === task?.orderIndex
  )[0]?.duration;

  const lastTaskDuration =
    statuses?.filter((item: any) => item.orderindex === task?.orderIndex + 1)[0]
      ?.duration + currentTaskDuration;

  const getFormattedDate = (dateInput: any) => {
    var date = new Date(dateInput);

    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;

    const dateFromSheet = new Date(formattedDate).getTime();

    return dateFromSheet;
  };

  const getStatusColor = (index: number | any) => {
    if (index <= task?.orderIndex) {
      return "#FFFF00";
    }
  };

  const isLate = (dueDate: number) => {
    if (new Date().getTime() > dueDate) {
      return "#FF5757";
    }
    if (new Date().getTime() < dueDate) {
      return "#CFFF00";
    }
  };

  function addBusinessDays(date: number, duration: number) {
    const currentDate = new Date(+date);

    for (let i = 1; i <= duration; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() === 6) {
        currentDate.setDate(currentDate.getDate() + 2);
      } else if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return currentDate.getTime();
  }

  const getPercentageProgress = (array: any[]) => {
    const amountActivity = array?.length;
    const completed = task?.orderIndex;

    return ((completed / amountActivity) * 100).toFixed();
  };

  const getDueDate = (index: number) => {
    const dueDate = history?.filter(
      (item: any) => item.orderIndex === index
    )[0];

    return dateFormatter(dueDate?.date_conclusion);
  };

  const dateFormatter = (epoch: number) => {
    if (epoch) {
      const date = new Intl.DateTimeFormat("pt-BR").format(epoch);

      const dateWithoutYear = date
        .split("/")
        .slice(0, date.split("/").length - 1)
        .join("/");

      return dateWithoutYear;
    }

    return "";
  };

  console.log("filteredStatus", filteredStatus);
  const getDate = ({ itemOrderIndex, taskOrderIndex }: any) => {
    if (itemOrderIndex > taskOrderIndex) {
      const duration =
        itemOrderIndex === filteredStatus[filteredStatus.length - 1].orderindex
          ? lastTaskDuration
          : currentTaskDuration;

      const nextTaskDueDate = dateFormatter(
        addBusinessDays(+task?.due_date, duration)
      );

      return nextTaskDueDate;
    } else if (itemOrderIndex === taskOrderIndex) {
      return dateFormatter(+task?.due_date);
    } else {
      return getDueDate(itemOrderIndex);
    }
  };

  return (
    <MainDiv>
      <TextBox>
        <div>{task?.name}</div>
        <div>
          <span>
            <BsNut size={30} />
          </span>
          <label>Progresso</label>
        </div>
      </TextBox>
      {processing ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : (
        <div className="div">
          {statuses?.map((item: any, index: number) => (
            <>
              <Span
                isFirst={index === 0}
                isLast={index === task?.orderIndex}
                customWidth={statuses?.length - 1}
                statusColor={getStatusColor(index)}
              >
                {index === task?.orderIndex ? (
                  <span>
                    {statuses?.length && getPercentageProgress(statuses)}%
                  </span>
                ) : null}
              </Span>
            </>
          ))}
        </div>
      )}
      <TaskIsCurrent>
        <div>TAREFAS ANTERIORES</div>
        <div>TAREFA ATUAL</div>
        <div>PRÓXIMAS TAREFAS</div>
      </TaskIsCurrent>
      <TaskContainer>
        {filteredStatus?.map((item: any, index: number) => (
          <>
            <CardTask
              current={item.status === task?.statusName}
              client={item.client_responsabilitie}
            >
              <label>
                {getDate({
                  itemOrderIndex: item.orderindex,
                  taskOrderIndex: task?.orderIndex,
                })}
              </label>
              <div>{item.status?.toUpperCase()}</div>
            </CardTask>
          </>
        ))}
      </TaskContainer>
      <Legend>
        <div>
          <span></span>
          <label>Responsabilidade Integracomm</label>
          <span></span>
          <label>Responsabilidade Parceiro</label>
        </div>
      </Legend>

      <Button onClick={() => setShowLabel(!showLabel)}>
        <IoIosArrowDown />
        TODAS AS TAREFAS
      </Button>
      {showLabel && (
        <LabelContainer>
          {statuses?.map((item: any, index: number) => (
            <div>
              <Circle
                opaco={index <= task?.orderIndex}
                color={item.client_responsabilitie ? "black" : "#f1c233"}
              >
                {index + 1}
              </Circle>
              <label>{item.status}</label>
            </div>
          ))}
        </LabelContainer>
      )}
    </MainDiv>
  );
};
