import { NavBarContainer } from "./styles";
import Logo from "../../images/Logo.png";

export const NavBar = () => {
  return (
    <NavBarContainer>
      <img src={Logo} />
    </NavBarContainer>
  );
};
