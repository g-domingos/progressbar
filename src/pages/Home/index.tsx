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
  const [showTooltip, setShowTooltip] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  let taskId = pathname.split("/").slice(2)[0];

  const clientResponsabilities = [
    "integração marketplaces",
    "importação de anúncios",
    "características",
    "criação de kits",
  ];

  const clientResponsabilitiesObject = [
    { id: 3, name: "integração marketplaces" },
    { id: 5, name: "importação de anúncios" },
    { id: 7, name: "características" },
    { id: 11, name: "criação de kits" },
  ];

  const isClientResponsibilitie = clientResponsabilitiesObject.map(
    (item: any) => item.id
  );

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

  const getStatusByClient = () => {
    axios
      .get(url.ENDPOINT + `/task/${taskId}`)
      .then((response) => {
        setTask(response.data.body);
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    getStatusesList();
    getStatusByClient();
  }, [pathname]);

  console.log("task", task);

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
    if (index <= task?.status?.orderindex) {
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

  function addBusinessDays(date: number) {
    const currentDate = new Date(+date);

    for (let i = 1; i <= 2; i++) {
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
    const completed = task?.status?.orderindex;

    return ((completed / amountActivity) * 100).toFixed();
  };

  const dateFormatter = (epoch: number) => {
    const date = new Intl.DateTimeFormat("pt-BR").format(epoch);

    const dateWithoutYear = date
      .split("/")
      .slice(0, date.split("/").length - 1)
      .join("/");

    return dateWithoutYear;
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
            <Span
              isFirst={index === 0}
              isLast={index === task?.status?.orderindex}
              customWidth={statuses?.length - 1}
              statusColor={getStatusColor(index)}
            >
              {index === task?.status?.orderindex ? (
                <span>
                  {statuses?.length && getPercentageProgress(statuses)}%
                </span>
              ) : null}
            </Span>
          ))}
        </div>
      )}
      <TaskIsCurrent>
        <div>TAREFAS ANTERIORES</div>
        <div>TAREFA ATUAL</div>
        <div>PRÓXIMAS TAREFAS</div>
      </TaskIsCurrent>
      <TaskContainer>
        {statuses
          ?.filter(
            (tasks: any, index: number) =>
              index >= task?.status?.orderindex - 2 &&
              index <= task?.status?.orderindex + 2
          )
          .map((item: any) => (
            <>
              <CardTask
                current={item.status === task?.status?.status}
                client={isClientResponsibilitie.includes(item.orderindex)}
              >
                <label>DATA</label>
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
                opaco={index <= task?.status?.orderindex}
                color={
                  clientResponsabilities.includes(item.status)
                    ? "black"
                    : "#f1c233"
                }
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
