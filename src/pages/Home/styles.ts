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
    top: 300px;
    align-items: center;
    width: 75%;
    height: 60px;
    border: 5px solid #eeeeee;
    background: #eeeeee;
    display: flex;
    gap: 4px;
    border-radius: 16px;
    justify-content: center;
    padding: 5px 0 5px 0;
  }

  img {
    margin-top: 30px;
    width: 200px;
    height: 60px;
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
  width: 20px;
  height: 20px;
  background: ${(props) => (props.color ? props.color : "#f1c233")};
  border-radius: 100%;
  color: ${(props) => (props.color === "black" ? "#f1c233" : "black")};
  font-weight: 900;
  font-size: 10px;
`;

export const SpinnerDiv = styled.div`
  background: white !important;
`;

export const TextBox = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  max-width: 500px;
  left: 13%;
  top: 130px;
  color: black;
  font-weight: 1000;
  font-size: 30px;
  font-family: Roboto;

  span {
    font-size: 60px;
    margin-left: 20px;
    color: #7ed957 !important;
  }
`;

export const LabelContainer = styled.div`
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  position: absolute;
  top: 400px;
  width: 80%;
  height: 200px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > label {
      margin-left: 10px;
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

export const DateContainer = styled.div`
  position: absolute;
  top: -60px;
  font-size: 10px;
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
  top: 252px;
  left: 10%;
  font-size: 11px;
  font-weight: 700;
  color: gray;
`;

export const Legend = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 30px;
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

  & > span:first-child {
    background: #f1c233 !important;
  }
`;
