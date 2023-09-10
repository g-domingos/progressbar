import styled, { css } from "styled-components";

export const Container = styled.div`
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  padding: 20px;
  background: #f3ecec;
  border-radius: 8px;
  border: none;

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
  padding: 15px 15px 0 15px;
  width: 92%;
  border-radius: 8px;

  ${(props) =>
    props.isClient
      ? css`
          border-top-right-radius: 0px;
          background: #ede2e2;
        `
      : css`
          border-top-left-radius: 0px;
          background: #FFFF00;
        `}

  & > span {
    display: flex;
    justify-content: flex-end;
    font-weight: 400;
    font-size: 10px;
    margin-bottom: 2px;
  }
`;
