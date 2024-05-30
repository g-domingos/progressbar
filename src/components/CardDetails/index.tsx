import { Spinner } from "@chakra-ui/react";
import { LoadingDiv } from "../../pages/Clients/styles";
import { LoadingSpinner } from "../LoadingSpinning";
import {
  CheckListContainer,
  Details,
  InfoContainer,
  Item,
  Responsible,
} from "./styles";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

export const CardDetails = ({ show, subtaskId }: any) => {

  const [subtaskDetail, setSubtaskDetail] = useState<any>();

  const { request, processing: processingSubtask } = useApi({ path: "" })

  function formatTimeSpent(time: number) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const fetchSubtask = (subtaskId: string) => {
    request({ method: "get", pathParameters: "/clients/tasks/" + subtaskId, queryStringParameters: { dev: true } }).then((response: any) => {
      setSubtaskDetail(response?.data);
    })
      .catch((err: any) => console.log(err));
  };


  const makeLinkClickable = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a href={part} key={index} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    fetchSubtask(subtaskId)
  }, [])

  return (
    <Details>
      {processingSubtask ? (
        <LoadingDiv>
          <Spinner />
        </LoadingDiv>
      ) : (
        <>
          <div>
            <label>DETALHES</label>
          </div>
          <InfoContainer>
            <Item>
              <label>TEMPO GASTO</label>
              {
                <p>
                  {subtaskDetail?.time_spent
                    ? formatTimeSpent(subtaskDetail?.time_spent)
                    : "-"}
                </p>
              }
            </Item>
            <Item>
              <label>DESCRIÇÃO</label>
              {subtaskDetail?.description && (
                <p>{makeLinkClickable(subtaskDetail?.description)}</p>
              )}
            </Item>
            <Item>
              <label>CHECKLIST</label>
              {subtaskDetail?.checklists?.[0]?.items
                ?.sort((a: any, b: any) => a.resolved - b.resolved)
                .map((item: any, index: number) => (
                  <CheckListContainer isChecked={item.resolved}>
                    <div>
                      {item.resolved ? (
                        <ImCheckboxChecked />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>
                    <p>{item.name}</p>
                  </CheckListContainer>
                ))}
            </Item>
            <Item>
              <label>RESPONSÁVEIS</label>
              {subtaskDetail?.assignees?.map((resp: any, index: number) => (
                <Responsible key={index}>
                  <img src={resp.profilePicture} />
                  <label>{resp.username}</label>
                </Responsible>
              ))}
            </Item>
          </InfoContainer>
        </>
      )}
    </Details>
  );
};
