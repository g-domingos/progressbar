import { NavBarContainer, UserArea } from "./styles";
import Logo from "../../images/Logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";

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
