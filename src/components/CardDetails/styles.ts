import styled from "styled-components";

export const Details = styled.div`
  padding: 5px;
  border-radius: 4px;
  background: #f1f1f1;
  animation: slide-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    & > label {
      margin-bottom: 10px;
    }
    & > label:first-child {
      font-weight: 700;
      color: #807d7d;
    }
  }

  @keyframes scale-up-ver-top {
    0% {
      -webkit-transform: scaleY(0.4);
      transform: scaleY(0.4);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
    100% {
      -webkit-transform: scaleY(1);
      transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
      transform-origin: 100% 0%;
    }
  }

  @keyframes slide-bottom {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;

export const Responsible = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 10px;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }
`;

export const InfoContainer = styled.div``;

export const Item = styled.div`
  & > label {
    font-weight: 500;
    color: #807d7d;
    font-size: 10px;
  }

  & > p {
    font-size: 13px;
    padding: 0 0.5rem;
    margin-bottom: 0;
  }
`;

export const CheckListContainer = styled.div<{ isChecked: boolean }>`
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: baseline;
  gap: 5px;

  & > p {
    margin-bottom: 0;
  }

  svg {
    color: #807d7d;
  }
`;
