import { NavBarContainer, UserArea } from "./styles";
import Logo from "../../images/whiteLogo.png";

import { AiOutlineUser } from "react-icons/ai";

export const NavBar = () => {
  return (
    <NavBarContainer>
      <img src={Logo} />

      <UserArea
        to="https://integracomm.com.br/area-do-cliente/"
        style={{ textDecoration: "none" }}
      >
        <AiOutlineUser />
        Área do Cliente
      </UserArea>
    </NavBarContainer>
  );
};
