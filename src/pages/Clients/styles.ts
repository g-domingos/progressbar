import styled from "styled-components";

export const MainDiv = styled.div`
  height: 100vh;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;

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
  font-size: 25px;
  font-family: Roboto;
  padding-left: 15px;
  padding-top: 35px;
  padding-bottom: 20px;

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
  margin-bottom: 30px;

  & > div {
    padding: 10px;
    width: 50%;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;

    & > div {
      width: 100%;
    }
  }
`;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 20px;
  font-family: "Roboto";
  color: black;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px lightgray;
  margin-bottom: 1.5rem;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Task = styled.div<{ color?: string }>`
  display: flex;
  gap: 0.8rem;
  font-weight: 700;
  font-size: 12px;
  position: relative;
  justify-content: space-between;

  & > div:first-child {
    display: flex;
    gap: 0.8rem;
  }

  & > div:last-child {
    color: #807d7d;
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
