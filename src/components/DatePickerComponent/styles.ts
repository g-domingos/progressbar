import styled from "styled-components";

export const Container = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
  gap: 1rem;
`;

export const DateContainer = styled.div`
  position: absolute;
  right: 10px;

  .react-datepicker__header {
    background: white !important;
  }

  .react-datepicker__navigation {
    span {
      color: black;
    }
  }
`;
