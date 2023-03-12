import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  Circle,
  ConcludedItem,
  DateBackground,
  DateBar,
  DateContainer,
  LabelContainer,
  Legend,
  MainDiv,
  Pencil,
  PredictDelivered,
  Pulsating,
  Span,
  SpinnerDiv,
  TasksContainer,
  TextBox,
  Tooltip,
} from "./styles";

import { BsNut } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import Spinner from "react-bootstrap/Spinner";
import { isMobile } from "react-device-detect";
import { url } from "../../env";

export const Home = () => {
  const [apiData, setApiData] = useState<any>();
  const [statuses, setStatuses] = useState<any>();
  const [task, setTask] = useState<any>();
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  let clientId = pathname.split("/").slice(3, 4)[0];
  const clientResponsabilities = [
    "integração marketplaces",
    "importação de anúncios",
    "características",
    "criação de kits",
  ];

  const fetchData = async () => {
    setProcessing(true);
    axios
      .get(`https://8e7my2u569.execute-api.us-east-1.amazonaws.com/${clientId}`)
      .then((response) => {
        setApiData(response.data.body);
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

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
    const taskId = "85yvra1j7";
    axios
      .get(url.ENDPOINT + `/task/${taskId}`)
      .then((response) => {
        setTask(response.data.body);
        setProcessing(false);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    // const fetch = async () => {
    //   await fetchData();
    // };

    // fetch();

    getStatusesList();
    getStatusByClient();
  }, [pathname]);

  console.log(task);
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
    if (index <= task?.status.orderindex) {
      return "#FFFF00";
    }
  };

  const isLate = (dueDate: number) => {
    // const predict = new Date(
    //   predictData?.split("/").reverse().join("-")
    // ).getTime();
    // const delivery = new Date(
    //   deliveryDate?.split("/").reverse().join("-")
    // ).getTime();

    // if (delivery > predict) {
    //   return "#FF5757";
    // } else if (delivery <= predict) {
    //   return "#CFFF00";
    // }

    if (new Date().getTime() > dueDate) {
      return "#FF5757";
    }
    if (new Date().getTime() < dueDate) {
      return "#CFFF00";
    }
  };

  const getPercentageProgress = (array: any[]) => {
    const amountActivity = array?.length;
    const completed = task?.status.orderindex;

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
              isLast={index === task?.status.orderindex}
              customWidth={statuses?.length - 1}
              statusColor={getStatusColor(index)}
            >
              {index === task?.status.orderindex ? (
                <span>
                  {statuses?.length && getPercentageProgress(statuses)}%
                </span>
              ) : null}
            </Span>
          ))}
        </div>
      )}
      <TasksContainer customWidth={statuses?.length - 1}>
        {statuses?.map((item: any, index: number) => (
          <>
            {/* {index === 0 && (
              <Pencil>
                <BiPencil size={20} style={{ marginLeft: "10px" }} />
              </Pencil>
            )} */}
            <div>
              <Circle
                opaco={index <= task?.status.orderindex}
                color={
                  clientResponsabilities.includes(item.status)
                    ? "black"
                    : "#f1c233"
                }
              >
                {index + 1}
              </Circle>
              {index === task?.status.orderindex && <Pulsating></Pulsating>}
            </div>
          </>
        ))}
      </TasksContainer>
      <DateBar>
        {statuses?.map((item: any, index: number) =>
          isMobile ? (
            <>
              {index === 0 && (
                <span className="calendar">
                  <AiOutlineCalendar size={15} style={{ marginRight: "5px" }} />
                </span>
              )}
              <DateContainer customWidth={statuses?.length - 1}>
                {/* <label>{item[3]?.slice(0, 5).split("/")[0]}/</label>
                <label>{item[3]?.slice(0, 5).split("/")[1]}</label> */}
              </DateContainer>
            </>
          ) : (
            <>
              <DateContainer customWidth={statuses?.length - 1}>
                {index === task?.status.orderindex && (
                  <>
                    <DateBackground
                      color={isLate(task?.due_date)}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      {index === task?.status.orderindex && (
                        <label>{dateFormatter(task.date_updated)}</label>
                      )}
                    </DateBackground>

                    {showTooltip && (
                      <Tooltip>
                        Data esperada para Conclusão:{" "}
                        {dateFormatter(task.due_date)}
                      </Tooltip>
                    )}
                  </>
                )}
              </DateContainer>
            </>
          )
        )}
      </DateBar>
      {/* <ConcludedItem>
        {statuses?.map((item: any, index: number) =>
          isMobile ? (
            <>
              {index === 0 && (
                <span className="done">
                  <FiCheckSquare size={15} style={{ marginRight: "0.5px" }} />
                </span>
              )}
              <DateContainer customWidth={statuses?.length - 1} isConcluded>
                <DateBackground color={isLate(item[3], item[4])}>
                  <label>
                    {item[4]?.slice(0, 5).split("/")[0]}
                    {item[4]?.slice(0, 5).split("/")[0] ? "/" : null}
                  </label>
                  <label>{item[4]?.slice(0, 5).split("/")[1]}</label>
                </DateBackground>
              </DateContainer>
            </>
          ) : (
            <>
              <DateContainer customWidth={statuses?.length - 1}>
                {index === 0 && (
                  <FiCheckSquare size={20} style={{ marginRight: "0.5px" }} />
                )}
                <DateBackground color={isLate(item[3], item[4])}>
                  <label>{item[4]?.slice(0, 5)}</label>
                </DateBackground>
              </DateContainer>
            </>
          )
        )}
      </ConcludedItem> */}
      <button onClick={() => setShowLabel(!showLabel)}>Mostrar tarefas</button>
      {showLabel && (
        <LabelContainer>
          {statuses?.map((item: any, index: number) => (
            <div>
              <Circle
                opaco={index <= task?.status.orderindex}
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
      <Legend>
        <div>
          <span></span>
          <label>Responsabilidade Integracomm</label>
          <span></span>
          <label>Responsabilidade Parceiro</label>
        </div>
      </Legend>
    </MainDiv>
  );
};
