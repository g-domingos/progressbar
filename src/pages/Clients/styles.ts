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
  justify-content: space-between;

  & > div {
    padding: 10px;
    width: 48%;
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

export const Details = styled.div`
  padding: 5px;
  border-radius: 4px;
  background: #f1f1f1;
  /* animation: scale-up-ver-top 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both; */
  animation: slide-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    & > label {
      margin-bottom: 10px;
    }
    & > label:first-child {
      font-weight: 700;
      color: #807d7d;
    }
    & > label:last-child {
      font-weight: 500;
      color: #807d7d;
      font-size: 10px;
    }
  }

  @keyframes scale-up-ver-top {
    0% {
      -webkit-transform: scaleY(0.4);
      transform: scaleY(0.4);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
    100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
  }

  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

export const Responsible = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 10px;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }
`;

export const ButtonShowDetails = styled.button`
  position: absolute;
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
