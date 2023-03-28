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
`;

export const TaskIsCurrent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 140px 0 140px;
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
