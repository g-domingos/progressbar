import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const ImgContainer = styled.div`
  position: absolute;
  z-index: -1;
  right: 0rem;
  top: 0rem;
  overflow: hidden;
  width: 300px;

  & > img {
    animation: spin 15s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Section = styled.section`
  border: 1px solid lightgray;
  box-shadow: 10px 10px 80px lightgray;
  border-radius: 1rem;
  width: 30rem;
  height: 25rem;
  margin-top: 5rem;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
  position: relative;

  & > div:first-child {
    font-size: 29px;
    font-weight: 800;
    margin-bottom: 15px;
  }
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 10px;
  position: relative;

  label {
    font-style: "Roboto";
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 5px;
  }

  input {
    border: 1px solid lightgray;
    box-shadow: 0 0 20px lightgray;
    border-radius: 6px;
    height: 2.5rem;
    padding-left: 15px;
    display: flex;
    align-items: center;
  }

  & > button {
    position: absolute;
    border: none;
    outline: none;
    background: transparent;
    right: 10px;
    top: 47%;
    color: gray;
    transition: color 0.5s ease-in-out;

    :hover {
      color: black;
    }
  }
`;

export const Button = styled.button`
  margin-top: 15px;
  width: 80%;
  border-radius: 6px;
  border: none;
  background: #ffff00;
  padding: 8px;
  font-weight: 700;
  box-shadow: 0 0 20px lightgray;
`;

export const ErrorContainer = styled.div<{ error?: boolean }>`
  & > label {
    color: ${(props) => (props.error ? "red" : "transparent")};
    font-weight: 600;
    font-size: 12px;
  }
`;
