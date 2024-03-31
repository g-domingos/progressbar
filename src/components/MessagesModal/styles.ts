import styled, { css } from "styled-components";

export const Container = styled.div`
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  padding: 20px;
  background: #f3ecec;
  border-radius: 8px;
  border: none;
  width: 100% !important;

  & > label {
    
    width: 100%;
    margin-bottom: 15px;
    font-weight: 700;
  }
`;

export const ConversationContainer = styled.div`
  box-shadow: 0 0 20px lightgray;
  padding: 15px;
  width: 98%;
  height: 93%;
  border-radius: 8px;
  background: white;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MessageContainer = styled.div<{ isClient?: boolean }>`
  display: flex;
  justify-content: ${({ isClient }) => (isClient ? "flex-end" : "flex-start")};
`;

export const Message = styled.div<{ isClient?: boolean }>`
  text-transform: none !important;
  box-shadow: 0 0 4px lightgray;
  display: flex;
  flex-direction: column;
  padding: 15px 15px 5px 15px;
  width: 92%;
  border-radius: 8px;

  ${(props) =>
    props.isClient
      ? css`
          border-top-right-radius: 0px;
          background: #a7b0c9;
        `
      : css`
          border-top-left-radius: 0px;
          background: #ffff00;
        `}

  & > span {
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 10px;
    margin-bottom: 2px;
  }
`;

export const AgentsContainer = styled.div`
  border: 5px solid lightgray;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  background: lightgray;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const RightSide = styled.div`
  position: relative;
  border: 3px solid lightgray;
  width: 70%;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  background: lightgray;

  @media screen and (max-width: 767px) {
    height: 100%;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid lightgray;
  border-radius: 8px;
  width: 30%;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 10px;
  padding: 5px;
  background: #f3ecec;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 30%;
  }
`;

export const Employee = styled.div<{ selected?: boolean }>`
  border-radius: 6px;
  background-color: ${(props) => props.selected && "#FFFF00"};
  padding: 8px;

  transition: 0.2s ease-in-out;
  font-weight: 500;
  transform: ${(props) => props.selected && "scale(1.04)"};
  box-shadow: 0 0 8px lightgray;

  & > label {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :hover {
    cursor: pointer;
    transform: scale(1.04);
  }
`;

export const Sessions = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid lightgray;
  background: #f3ecec;
  text-transform: none;
  transition: 0.2s ease-in-out;

  :hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  background: #f3ecec;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: 500;

  & > button {
    border: none;
    padding: 4px;
    border-radius: 8px;

    :hover {
      background: white;
      transform: scale(1.1);
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  height: 430px !important;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DownloadButton = styled.button`
  width: 4rem;
  border: none;
  background: none;

  cursor: pointer;
`;
