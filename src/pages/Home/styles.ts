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
  align-items: center;
  color: black;
  gap: 10px;
  font-weight: 1000;
  font-size: 22px;
  font-family: Roboto;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 10px;
`;

export const LabelContainer = styled.div`
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
  position: absolute;
  top: 340px;
  width: 80%;
  height: 170px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > label {
      margin-left: 10px;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;

export const DateContainer = styled.div<{ customWidth?: any }>`
  width: calc(100% / ${(props) => props.customWidth});
  font-size: 10px;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  border: 1px solid red;
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
  top: 193px;
  left: 10%;
  font-size: 10px;
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
`;
