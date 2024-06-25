import { NavBarContainer, UserArea } from "./styles";
import Logo from "../../images/whiteLogo.png";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<string>("");

  const getUserProfile = async () => {
    const user = await fetchUserAttributes();
    setUserProfile(user.profile || "");
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleRedirect = () => {
    if (userProfile === "ADMIN") {
      navigate("/admin/clients");
      return;
    }
  };

  return (
    <NavBarContainer>
      <Flex
        _hover={{ cursor: "pointer" }}
        onClick={handleRedirect}
      >
        <img src={Logo} />
      </Flex>
    </NavBarContainer>
  );
};
