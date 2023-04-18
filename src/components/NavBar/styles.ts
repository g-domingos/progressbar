import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBarContainer = styled.header`
  height: 50px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 30px;

  img {
    height: 8rem;
    width: 8rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const UserArea = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  gap: 4px;

  :hover {
    color: yellow;
  }
`;
