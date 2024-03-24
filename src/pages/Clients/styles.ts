import styled from "styled-components";

export const MainDiv = styled.div<{ processing?: boolean }>`
  height: 89vh;
  width: 100%;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;
  opacity: ${(props) => (props.processing ? 0.3 : 1)};

  @media screen and (max-width: 767px) {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  gap: 10px;
  font-weight: 1000;
  font-size: 20px;
  font-family: Roboto;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 10px;

  & > div:last-child {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ColumnsDivs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 65vh;

  & > div {
    height: 100%;
    width: 49%;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    height: 100vh;

    & > div {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
`;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 16px;
  font-family: "Roboto";
  color: black;
  padding: 0.8rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px lightgray;
`;

export const TasksContainer = styled.div`
  box-shadow: 0 0 3px lightgray;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 10px 10px 12px 12px;
  height: 80%;

  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 24px;
  }
`;

export const Task = styled.div<{ color?: string }>`
  display: flex;
  gap: 0.8rem;
  font-weight: 700;
  font-size: 12px;
  position: relative;
  justify-content: space-between;
  padding: 0px 5px;

  :hover {
    cursor: pointer;
    background: #dfdada;
    border-radius: 4px;
  }

  & > div:first-child {
    display: flex;
    gap: 0.8rem;
  }

  & > img {
    border-radius: 100%;
    height: 25px;
    width: 25px;
  }

  .date {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 5px;
    font-size: 8px;
  }

  @media screen and (max-width: 767px) {
    & > div:first-child {
      display: flex;
      height: auto;
    }
  }
`;

export const Span = styled.div<{ color?: string }>`
  background: ${(props) => props.color};
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  min-height: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;

  & > div {
    border: 3px solid white;
    border-radius: 2px;
    width: 15px;
    height: 15px;
    background: ${(props) => props.color};
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -35px;
  background: black;
  color: lightgrey;
  font-size: 11px;
  padding: 7px;
  border-radius: 4px;
`;

export const ButtonShowDetails = styled.button`
  transform: scale(1);
  right: -1.2rem;
  background: none;
  border: none;
  color: #807d7d;
  transition: color 0.3s ease-in-out transform 0.3s ease-in-out;

  :hover {
    color: black;
    transform: scale(1.2);
  }
`;

export const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const SessionContainerClient = styled.div`
  box-shadow: 0 0 5px lightgray;
  display: flex;
  padding: 5px;
  padding-left: 15px;
  gap: 15px;
  border-radius: 8px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500 !important;
  align-items: center;
  text-transform: uppercase !important;

  & > span {
  }

  :hover {
    transform: scale(1.03);
  }
`;

export const SessionsHistoryContainerClient = styled.div`
  box-shadow: 0 0 15px lightgray;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 150px;
  max-height: 500px;
  gap: 0.5rem;
  height: 200px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 16px;
  text-transform: uppercase !important;

  & > label {
    padding-left: 15px;
    font-weight: 500;
  }
`;

export const Footer = styled.footer`
  padding: 8px;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  & > button {
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 100%;
    background: transparent;

    :hover {
      background: lightgray;
    }

    :focus {
      border: none;
    }
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 2rem;
  padding: 0 15px 2px 0px;
  margin-bottom: 2px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 100%;
    padding: 4px;
    width: 2rem;
    height: 2rem;
    background: transparent;

    :hover {
      background: #ebe5e5;
    }
  }
`;

export const ContainerLegend = styled.div`
  box-shadow: 0 0 5px lightgray;
  margin-top: 10px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > label {
    font-weight: 700;
    color: black;
    font-size: 14px;
  }

  & > div {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    display: flex;
    gap: 5px;
  }
`;
