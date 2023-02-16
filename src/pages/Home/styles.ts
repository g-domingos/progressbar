import styled from "styled-components";

export const Container = styled.body`
  display: flex;
  flex-direction: column;
`;

export const MainDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;

  .div {
    position: absolute;
    top: 400px;
    align-items: center;
    width: 75%;
    height: 8%;
    border: 10px solid #eeeeee;
    background: #eeeeee;
    display: flex;
    gap: 4px;
    border-radius: 16px;
    justify-content: center;
    padding: 5px 0 5px 0;
  }

  & > img {
    margin-top: 80px;
    width: 280px;
    height: 85px;
  }

  a:active,
  a:focus {
    box-shadow: none;
  }
`;

export const Span = styled.span<{ customWidth?: number; statusColor?: string }>`
  width: calc(100% / ${(props) => props.customWidth});
  background: ${(props) => props.statusColor};
  height: 100%;
  border: 5px solid transparent;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > label {
    position: absolute;
    top: -70px;
    color: black;
    font-weight: 900;
    font-size: 18px;
  }
`;

export const Circle = styled.div<{ opaco?: boolean; color?: string }>`
  opacity: ${(props) => (props.opaco ? "1" : "0.4")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${(props) => (props.color ? props.color : "#f1c233")};
  border-radius: 100%;
  color: ${(props) => (props.color === "black" ? "#f1c233" : "black")};
  font-weight: 900;
  font-size: 20px;
`;

export const SpinnerDiv = styled.div`
  background: white !important;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  max-width: 38%;
  left: 13%;
  top: 18%;
  color: black;
  font-weight: 1000;
  font-size: 46px;
  font-family: Roboto;

  span {
    font-size: 70px;
    margin-left: 20px;
    color: #7ed957 !important;
  }
`;

export const LabelContainer = styled.div`
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  position: absolute;
  bottom: 22%;
  width: 80%;
  height: 25%;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > label {
      margin-left: 15px;
      font-size: 25px;
      font-weight: 500;
    }
  }
`;

export const DateContainer = styled.div`
  position: absolute;
  top: -90px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  width: 70%;
`;

export const DateBackground = styled.span<{ color?: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.color};
  border-radius: 9px;
`;

export const PredictDelivered = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 332px;
  left: 11%;
  font-size: 14px;
  font-weight: 700;
  color: gray;
`;

export const Legend = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 10%;
  gap: 20px;
  font-weight: 800;
  font-family: Roboto;

  span {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: black;
  }

  & > span:first-child {
    background: #f1c233 !important;
  }
`;
