import { ToastContainer, toast as toastFunction } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export const Toast = () => {
  return <ToastComponent position="top-right" />;
};

const ToastComponent = styled(ToastContainer)`
  z-index: 10001;
  .Toastify__close-button {
    color: gray;
  }
  & > div {
    background-color: rgba(243, 242, 242, 1);
    border: 1px solid gray;
  }
  div {
    color: #5e5b5b;
  }
`;

export const error = (message: string | undefined) => {
  toastFunction.error(message || "Algo deu Errado!");
};

export const success = (message: string | undefined) => {
  toastFunction.success(message || "Salvo com sucesso!", { autoClose: 2000 });
};

export const toast = (message: string, type?: string) => {
  if (
    type === "warning" ||
    type === "error" ||
    type === "success" ||
    type === "info"
  ) {
    toastFunction[type](message);
  } else {
    toastFunction(message);
  }
};
