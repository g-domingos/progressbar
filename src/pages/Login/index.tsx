import {
  Button,
  Container,
  ErrorContainer,
  ImgContainer,
  InputContent,
  Section,
} from "./styles";
import Circle from "../../images/Ellipse 1.svg";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../../App";

export const Login = ({ setIsAuthorized }: any) => {
  const [loginInfo, setLoginInfo] = useState<any>({
    login: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const { setUpdate, update } = useContext(UserContext);

  const handleChange = (e: any) => {
    if (e.target.id === "login") {
      setLoginInfo({
        ...loginInfo,
        login: e.target.value,
      });
    } else {
      setLoginInfo({
        ...loginInfo,
        password: e.target.value,
      });
      setError(false);
    }
  };

  const handleLogin = () => {
    if (loginInfo.login === "admin" && loginInfo.password === "123") {
      localStorage.setItem("isAuthorized", "true");
      setIsAuthorized(true);
      setUpdate(true);
    } else {
      setError(true);
    }
  };

  const loginWhenPressedEnter = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };
  return (
    <Container>
      <Section>
        <div>
          <label>Bem vindo!</label>
        </div>
        <InputContent>
          <label>Login</label>
          <input
            autoFocus={true}
            value={loginInfo.login}
            id="login"
            onChange={handleChange}
          />
        </InputContent>
        <InputContent>
          <label>Senha</label>
          <input
            value={loginInfo.password}
            type={!showPass ? "password" : "text"}
            id="password"
            onChange={handleChange}
            onKeyDown={loginWhenPressedEnter}
          />
          <button onClick={handleShowPassword}>
            {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </InputContent>

        <ErrorContainer error={error}>
          <label>Credencias incorretas. Corrija-as e tente novamente.</label>
        </ErrorContainer>

        <Button onClick={handleLogin}>Entre</Button>
        <ImgContainer>
          <img src={Circle} />
        </ImgContainer>
      </Section>
    </Container>
  );
};
