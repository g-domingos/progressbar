import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  font-family: Roboto;
  background: #f1f4ea;
`;

export const Teste = styled.div`
  background: red;
`;

export const Main = styled.div`
  width: 90%;
  height: 90vh;
  background: white;
  border-radius: 0.7rem;
  margin-top: 1rem;
  padding: 1rem;

  & > label:nth-child(1) {
    font-size: 1.7rem;
    font-weight: 700;
  }

  & > div:first-child {
  }
`;

export const TaskDetails = styled.div`
  margin-top: 1rem;

  & > div {
    padding-left: 1rem;
    display: flex;
    height: 6.5rem;

    & > span {
      margin-right: 1rem;
    }

    & > div {
      width: 10rem;
      margin-left: 1rem;

      & > label {
        border: 1px solid gold;
        font-weight: 800;
        font-size: 0.8rem;
        padding: 8px;

        width: 100%;
        border-radius: 0.8rem;
        box-shadow: 0 0 20px lightgray;
        margin-bottom: 0.7rem;
      }

      & > p {
        text-overflow: ellipsis;
        height: 50%;
        width: 100%;
        overflow: hidden;
        padding-left: 8px;
      }

      & > div {
        display: flex;
        align-items: baseline;
        gap: 0.8rem;

        & > input {
          width: 30%;
          margin-left: 0.5rem;
          padding-left: 0.5rem;
        }
      }
    }

    & > div:nth-child(4) {
      div {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        padding-right: 1rem;
      }
    }
    & > div:nth-child(5) {
      div {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        padding-right: 1rem;
        margin-left: 0.5rem;
      }
    }
  }
`;

export const TaskDetailsBar = styled.div`
  width: 100%;
  height: 3rem !important;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px lightgray;

  display: flex;
  align-items: center;
  padding: 1.3rem;
  font-weight: 600;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  margin-left: 42rem;
  background: #ffff00;
  border-radius: 0.5rem;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 0.9rem;
  margin-bottom: 5rem;


`;
