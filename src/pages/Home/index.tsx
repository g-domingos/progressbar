import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import {
  Circle,
  DateBackground,
  DateBar,
  DateContainer,
  LabelContainer,
  Legend,
  MainDiv,
  PredictDelivered,
  Span,
  SpinnerDiv,
  TextBox,
} from "./styles";
import Logo from "../../images/Logo.png";
import { BsNut } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";

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
        {/*  */}
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
                apiData?.slice(1)[index][4] && !apiData?.slice(1)[index + 1]?.[4]
              }
              customWidth={apiData.length - 1}
              statusColor={getStatusColor(item[4])}
            >
              {apiData?.slice(1)[index]?.[4] &&
              !apiData?.slice(1)[index + 1]?.[4] ? (
                <span>
                  {apiData?.length && getPercentageProgress(apiData)}%
                </span>
              ) : null}

              {/* <Circle
                opaco={item[4]?.length}
                color={item[5]?.length ? "black" : "#f1c233"}
              >
                {index + 1}
              </Circle> */}
            </Span>
          ))}
        </div>
      )}
      <DateBar>
        {apiData?.slice(1)?.map((item: any, index: number) => (
          <DateContainer customWidth={apiData.length - 1}>
            {index === 0 && <AiOutlineCalendar size={30} />}
            <label>{item[3]?.slice(0, 5)}</label>
            {/* <DateBackground color={isLate(item[3], item[4])}>
              <label>{item[4]?.slice(0, 5)}</label>
            </DateBackground> */}
          </DateContainer>
        ))}
      </DateBar>
      <PredictDelivered>
        <label>previsto</label>
        <label>entregue</label>
      </PredictDelivered>
      {/* <NavLink
        to="https://integracomm.com.br/area-do-cliente/"
        style={{ textDecoration: "none", height: "100px" }}
        target="_blank"
      ></NavLink> */}

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
        <span></span>
        <label>Responsabilidade Integracomm</label>
        <span></span>
        <label>Responsabilidade Parceiro</label>
      </Legend>
    </MainDiv>
  );
};
