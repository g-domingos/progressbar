import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Circle,
  LabelContainer,
  MainDiv,
  Span,
  SpinnerDiv,
  TextBox,
} from "./styles";
import Logo from "../../images/Logo.png";

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
      .get(
        `https://gefgshpdak.execute-api.us-east-1.amazonaws.com/client-id/${clientId}`
      )
      .then((response) => {
        setApiData(response.data.body);
        setProcessing(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchData();
    };

    fetch();
  }, []);

  const getStatusColor = (dateInput: number | any) => {
    if (dateInput) {
      var date = new Date(dateInput);
      var day = date.getDate().toString().padStart(2, "0");
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var year = date.getFullYear();
      var formattedDate = day + "/" + month + "/" + year;

      const dateFromSheet = new Date(formattedDate).getTime();

      const todayDate = new Date().setHours(0, 0, 0, 0);
      const tomorrow = new Date().setHours(24, 0, 0, 0);

      if (dateFromSheet < todayDate) {
        return "#0F6360";
      } else if (
        dateFromSheet >= todayDate &&
        dateFromSheet <= tomorrow - 1000
      ) {
        return "#71B27E";
      }

      return "#DFF8CA";
    }
  };

  return (
    <MainDiv>
      <TextBox>
        seu progresso
      </TextBox>
      <img src={Logo} />
      {processing ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : (
        <div className="div">
          {apiData?.slice(1)?.map((item: any, index: number) => (
            <Span
              customWidth={apiData.length}
              statusColor={getStatusColor(item[1])}
            >
              <label>{item[1]?.slice(0, 5)}</label>
              <Circle opaco={item[1]?.length}>{index + 1}</Circle>
            </Span>
          ))}
        </div>
      )}
      <LabelContainer>
        {apiData?.slice(1)?.map((item: any, index: number) => (
          <div>
            <Circle opaco={item[1]?.length}>{index + 1}</Circle>
            <label>{item[0]}</label>
          </div>
        ))}
      </LabelContainer>
    </MainDiv>
  );
};
