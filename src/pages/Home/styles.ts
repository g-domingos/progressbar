import styled from "styled-components";

export const Container = styled.body`
  display: flex;
  flex-direction: column;
`;

export const MainDiv = styled.div`
  height: 100vh;
  position: relative;
  padding-left: 40px;
  padding-right: 40px;

  .div {
    width: 100%;
    height: 40px;
    display: flex;
    border-radius: 25px;
    box-shadow: 0 0 15px lightgray;
  }

  span {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a:active,
  a:focus {
    box-shadow: none;
  }

  @media screen and (max-width: 767px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

export const Span = styled.span<{
  customWidth?: number;
  statusColor?: string;
  isFirst?: boolean;
  isLast?: boolean;
}>`
  width: calc(100% / ${(props) => props.customWidth});
  background: ${(props) => props.statusColor};
  height: 100%;
  display: flex;
  position: relative;
  border-bottom-left-radius: ${(props) => (props.isFirst ? "20px" : "none")};
  border-top-left-radius: ${(props) => (props.isFirst ? "20px" : "none")};
  border-bottom-right-radius: ${(props) => (props.isLast ? "20px" : "none")};
  border-top-right-radius: ${(props) => (props.isLast ? "20px" : "none")};

  & > label {
    position: absolute;
    top: -70px;
    color: black;
    font-weight: 900;
    font-size: 18px;
  }

  @media screen and (max-width: 767px) {
    span {
      margin-right: 2.3rem;
    }
  }
`;

export const Circle = styled.div<{ opaco?: boolean; color?: string }>`
  opacity: ${(props) => (props.opaco ? "1" : "0.4")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: ${(props) => (props.color ? props.color : "#f1c233")};
  border-radius: 100%;
  color: ${(props) => (props.color === "black" ? "#f1c233" : "black")};
  font-weight: 700;
  font-size: 17px;

  @media screen and (max-width: 767px) {
    height: 20px;
    width: 20px;
    font-size: 0.5rem;
  }
`;

export const SpinnerDiv = styled.div`
  background: white !important;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  gap: 10px;
  font-weight: 1000;
  font-size: 22px;
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

export const LabelContainer = styled.div`
  margin-top: 20px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  height: 110px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > label {
      margin-left: 5px;
      font-size: 13px;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    flex-wrap: wrap;
    height: 15rem;
    gap: 0.5rem;
    margin-top: 2rem;
  }
`;

export const DateContainer = styled.div<{
  customWidth?: any;
  isConcluded?: boolean;
}>`
  width: calc(100% / ${(props) => props.customWidth});
  font-size: 16px;
  flex-direction: column;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 767px) {
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    justify-content: center;
    align-items: center;
    position: relative;

    & > label:last-child {
      font-size: 0.5rem;
    }
  }
`;

export const DateBackground = styled.span<{ color?: string }>`
  display: flex;
  height: 100%;
  justify-content: center;
  background: ${(props) => props.color};
  border-radius: 15px;
  padding: 2px;
  font-size: 17px !important;

  @media screen and (max-width: 767px) {
    display: flex;
    height: 140%;
    width: 1.4rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.3rem;
    & > label:first-child {
      font-size: 0.7rem !important;
    }

    & > label:last-child {
      font-size: 0.5rem !important;
    }
  }
`;

export const PredictDelivered = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 193px;
  left: 10%;
  font-size: 10px;
  font-weight: 700;
  color: gray;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  gap: 20px;
  font-weight: 800;
  font-family: Roboto;
  font-size: 12px;

  span {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: black;
  }

  & > div {
    & > span:first-child {
      background: #f1c233 !important;
    }

    height: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 20px lightgray;
  }

  @media screen and (max-width: 767px) {
    margin-top: 2rem;
  }
`;

export const DateBar = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  height: 40px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 15px lightgray;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 5px;
  padding-bottom: 5px;

  @media screen and (max-width: 767px) {
    position: relative;

    .calendar {
      position: absolute;
      top: -0.8rem;
      left: 0px;
    }
  }
`;

export const ConcludedItem = styled.div`
  display: flex;
  margin-top: 15px;
  height: 25px;
  padding-left: 5px;
  padding-right: 8px;

  @media screen and (max-width: 767px) {
    padding-left: 0;
    position: relative;
    display: flex;
    padding-right: 1rem;
    margin-top: 1.5rem;

    .done {
      position: absolute;
      top: -1.1rem;
      left: 0;
    }
  }
`;

export const TasksContainer = styled.div<{ customWidth?: any }>`
  border-top: 3px solid lightgray;
  border-bottom: 3px solid lightgray;
  position: relative;
  height: 50px;
  margin-top: 13px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;

  & > div {
    width: calc(100% / ${(props) => props.customWidth}) !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 767px) {
    padding-left: 0.3rem;
    padding-right: 1rem;
    display: flex;
    width: 100%;
    gap: 0.28rem;

    & > div {
    }
  }
`;

export const Pencil = styled.span`
  position: absolute;
  left: 0;

  @media screen and (max-width: 767px) {
    top: -0.6rem;
    left: -0.8rem;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background: lightgray;
  padding: 5px;
  border-radius: 5px;
  width: 10rem;
  top: 2rem;
`;

export const Pulsating = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 30px;
  height: 30px;

  &:before {
    content: "";
    position: relative;
    display: block;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 45px;
    background-color: lightgray;
    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.33);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
`;

export const StandardText = styled.div`
  margin-top: 1rem;
  width: 35%;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-left: 0.8rem;
  padding-bottom: 0.3rem;
  box-shadow: 0 0 20px lightgray;
  border-radius: 1rem;

  label {
    font-weight: 600;
  }
`;

export const Button = styled.button`
  margin-top: 2rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: lightgray;
`
