import { NavBarContainer, UserArea } from "./styles";
import Logo from "../../images/whiteLogo.png";

import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../App";

export const NavBar = () => {
  const [opacitiy, setOpacity] = useState<boolean>(false);

  const { setUpdate, update } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    if (update) {
      setOpacity(true);
    }
  }, [update]);

  return (
    <NavBarContainer opacity={true}>
      <img src={Logo} />

      {/* <UserArea
        to="https://integracomm.com.br/area-do-cliente/"
        style={{ textDecoration: "none" }}
      >
        <AiOutlineUser />
        Área do Cliente
      </UserArea> */}
    </NavBarContainer>
  );
};
