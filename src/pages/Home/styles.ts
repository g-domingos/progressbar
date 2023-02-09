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
    color: red;
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

export const Circle = styled.div<{ opaco?: boolean }>`
  opacity: ${(props) => (props.opaco ? "1" : "0.4")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #f1c233;
  border-radius: 100%;
  color: black;
  font-weight: 900;
  font-size: 20px;
`;

export const SpinnerDiv = styled.div`
  background: white !important;
`;

export const TextBox = styled.div`
  display: flex;
  position: absolute;
  max-width: 38%;
  left: 13%;
  top: 20%;
  color: black;
  font-weight: 1000;
  font-size: 46px;
  font-family: Roboto;

  span {
    position: absolute;
    left: -30px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: #f1c233;
    filter: blur(5px);
    z-index: -1;
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
