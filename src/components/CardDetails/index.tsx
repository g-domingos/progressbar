import {
  CheckListContainer,
  Details,
  InfoContainer,
  Item,
  Responsible,
} from "./styles";

import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
export const CardDetails = ({ details }: any) => {
  function formatTimeSpent(time: number) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  console.log(details);

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

  return (
    <Details>
      <div>
        <label>DETALHES</label>
      </div>
      <InfoContainer>
        <Item>
          <label>TEMPO GASTO</label>
          {
            <p>
              {details?.time_spent ? formatTimeSpent(details?.time_spent) : "-"}
            </p>
          }
        </Item>
        <Item>
          <label>DESCRIÇÃO</label>
          {details?.description && (
            <p>{makeLinkClickable(details?.description)}</p>
          )}
        </Item>
        <Item>
          <label>CHECKLIST</label>
          {details?.checklists[0]?.items
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
          {details?.assignees.map((resp: any, index: number) => (
            <Responsible key={index}>
              <img src={resp.profilePicture} />
              <label>{resp.username}</label>
            </Responsible>
          ))}
        </Item>
      </InfoContainer>
    </Details>
  );
};
