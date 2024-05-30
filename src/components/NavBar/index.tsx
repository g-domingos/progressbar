import { NavBarContainer, UserArea } from "./styles";
import Logo from "../../images/whiteLogo.png";

import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../App";

export const NavBar = () => {



  return (
    <NavBarContainer>
      <img src={Logo} />
    </NavBarContainer>
  );
};
