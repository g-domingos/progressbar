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
  Span,
  SpinnerDiv,
  TasksContainer,
  TextBox,
} from "./styles";

import { BsNut } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import Spinner from "react-bootstrap/Spinner";
import { isMobile } from "react-device-detect";

export const Home = () => {
  const [apiData, setApiData] = useState<any>();
  const [processing, setProcessing] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const clientId = pathname.split("/").slice(3, 4)[0];

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

  useEffect(() => {
    const fetch = async () => {
      await fetchData();
    };

    fetch();
  }, [pathname]);

  const getFormattedDate = (dateInput: any) => {
    var date = new Date(dateInput);

    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;

    const dateFromSheet = new Date(formattedDate).getTime();

    return dateFromSheet;
  };

  const getStatusColor = (dateInput: number | any) => {
    if (dateInput) {
      const dateFromSheet = getFormattedDate(dateInput);
      const todayDate = new Date().setHours(0, 0, 0, 0);
      const tomorrow = new Date().setHours(24, 0, 0, 0);

      if (dateInput) {
        return "#FFFF00";
      }

      if (dateFromSheet >= todayDate && dateFromSheet <= tomorrow - 1000) {
        return "#71B27E";
      }
    }
  };

  const isLate = (predictData: number | any, deliveryDate: any) => {
    const predict = new Date(
      predictData?.split("/").reverse().join("-")
    ).getTime();
    const delivery = new Date(
      deliveryDate?.split("/").reverse().join("-")
    ).getTime();

    if (delivery > predict) {
      return "#FF5757";
    } else if (delivery <= predict) {
      return "#CFFF00";
    }
  };

  const getPercentageProgress = (array: any[]) => {
    const amountActivity = array?.slice(1).length;
    const completed = array?.slice(1).filter((item: any) => item[4]).length;

    return ((completed / amountActivity) * 100).toFixed();
  };

  return (
    <MainDiv>
      <TextBox>
        <span>
          <BsNut size={30} />
        </span>
        <label>Progresso</label>
      </TextBox>
      {processing ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : (
        <div className="div">
          {apiData?.slice(1)?.map((item: any, index: number) => (
            <Span
              isFirst={index === 0}
              isLast={
                apiData?.slice(1)[index][4] &&
                !apiData?.slice(1)[index + 1]?.[4]
              }
              customWidth={apiData?.length - 1}
              statusColor={getStatusColor(item[4])}
            >
              {apiData?.slice(1)[index]?.[4] &&
              !apiData?.slice(1)[index + 1]?.[4] ? (
                <span>
                  {apiData?.length && getPercentageProgress(apiData)}%
                </span>
              ) : null}
            </Span>
          ))}
        </div>
      )}
      <DateBar>
        {apiData?.slice(1)?.map((item: any, index: number) =>
          isMobile ? (
            <>
              {index === 0 && (
                <span className="calendar">
                  <AiOutlineCalendar size={15} style={{ marginRight: "5px" }} />
                </span>
              )}
              <DateContainer customWidth={apiData?.length - 1}>
                <label>{item[3]?.slice(0, 5).split("/")[0]}/</label>
                <label>{item[3]?.slice(0, 5).split("/")[1]}</label>
              </DateContainer>
            </>
          ) : (
            <>
              <DateContainer customWidth={apiData?.length - 1}>
                {index === 0 && (
                  <AiOutlineCalendar size={20} style={{ marginRight: "5px" }} />
                )}
                <label>{item[3]?.slice(0, 5)}</label>
              </DateContainer>
            </>
          )
        )}
      </DateBar>
      <ConcludedItem>
        {apiData?.slice(1)?.map((item: any, index: number) =>
          isMobile ? (
            <>
              {index === 0 && (
                <span className="done">
                  <FiCheckSquare size={15} style={{ marginRight: "0.5px" }} />
                </span>
              )}
              <DateContainer customWidth={apiData?.length - 1} isConcluded>
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
              <DateContainer customWidth={apiData?.length - 1}>
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
      </ConcludedItem>
      <TasksContainer customWidth={apiData?.length - 1}>
        {apiData?.slice(1)?.map((item: any, index: number) => (
          <>
            {index === 0 && (
              <Pencil>
                <BiPencil size={20} style={{ marginLeft: "10px" }} />
              </Pencil>
            )}
            <div>
              <Circle
                opaco={item[4]?.length}
                color={item[5]?.length ? "black" : "#f1c233"}
              >
                {index + 1}
              </Circle>
            </div>
          </>
        ))}
      </TasksContainer>

      <LabelContainer>
        {apiData?.slice(1)?.map((item: any, index: number) => (
          <div>
            <Circle
              opaco={item[4]?.length}
              color={item[5]?.length ? "black" : "#f1c233"}
            >
              {index + 1}
            </Circle>
            <label>{item[0]}</label>
          </div>
        ))}
      </LabelContainer>
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
