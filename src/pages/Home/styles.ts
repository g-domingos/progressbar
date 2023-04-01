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
    padding-left: 1.2rem;
    padding-right: 1.2rem;
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
  width: 50%;
  height: 130px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 40%;

    & > label {
      margin-left: 5px;
      font-size: 13px;
      font-weight: 500;
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    min-height: 10rem;
    max-height: 50rem;
    width: 23rem;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;

    & > div {
      display: flex;
      justify-content: space-between;
      width: 95%;
    }
  }
`;

export const HistoryDate = styled.label<{ color?: string; current?: boolean }>`
  background: ${({ color }) => color};
  padding: 5px;
  border-radius: 1rem;
  animation: ${({ current }) => current && "oscilate 1s alternate infinite"};

  @keyframes oscilate {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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
      background: #f1c233;
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

export const Button = styled.button`
  margin-top: 2rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 0 20px lightgray;
  width: 100%;
  font-weight: 700;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  gap: 0.5rem;
`;

export const TaskContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    height: 18rem;
    flex-direction: column;
  }
`;

export const CardTask = styled.div<{ current?: boolean; client?: boolean }>`
  width: ${(props) => (props.current ? "22rem" : "13.5rem")};
  height: ${(props) => (props.current ? "70%" : "50%")};
  border-radius: 1rem;
  font-size: ${(props) => (props.current ? "20px" : "12px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px lightgray;
  opacity: ${(props) => !props.current && "0.7"};

  & > label {
    background: ${(props) => (props.client ? "#5D5757" : "#FFFF00")};
    width: 100%;
    border-radius: 1rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px lightgray;
    color: ${(props) => (props.client ? "lightgray" : "black")};
    font-weight: 700;
  }

  & > div {
    margin-top: ${(props) => (props.current ? "20px" : "10px")};
    font-weight: 700;
    font-family: Roboto;
  }

  @media screen and (max-width: 767px) {
    width: ${(props) => (props.current ? "20rem" : "15rem")};
    height: ${(props) => (props.current ? "35%" : "25%")};

    & > label {
      height: 2rem;
    }
  }
`;

export const TaskIsCurrent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 10rem 0 10rem;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 18px;

  & > div:nth-child(1) {
    font-size: 14px;
  }

  & > div:nth-child(3) {
    font-size: 14px;
  }
`;

export const LegendTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 20px;
  font-weight: 800;
  font-family: Roboto;
  font-size: 12px;

  span {
    width: 20px;
    height: 20px;
    border-radius: 100%;
  }

  & > div {
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
    margin-bottom: 2rem;

  }
`;
