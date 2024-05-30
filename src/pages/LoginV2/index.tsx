import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import {
  confirmResetPassword,
  confirmSignIn,
  fetchUserAttributes,
  resetPassword,
  signIn,
} from "aws-amplify/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { awsConfig } from "../../services/awsConfig";
import { useApi } from "../../hooks/useApi";
import Logo from "../../images/Logo.png";
import colors from "../../styles/theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Slice } from "../../context";

Amplify.configure(awsConfig);

export const LoginV2 = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [loginStage, setLoginStage] = useState<string>("LOGIN");
  const [newPasswords, setNewPasswords] = useState<{
    password1: string;
    password2: string;
  }>({ password1: "", password2: "" });
  const [showPass, setShowPass] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const { request } = useApi({ path: `` });

  const { user, setUser } = useContext(Slice) as any;

  const getUser = async ({
    userId,
    taskId,
  }: {
    userId: string;
    taskId: string;
  }) => {
    return request({
      method: "get",
      pathParameters: `/task/${taskId}/users/${userId}`,
    }).then((response: any) => {
      setUser(response);
      return response;
    });
  };

  const redirectUser = async (user: any) => {
    const { profile, family_name } = user;

    if (profile === "ADMIN") {
      navigate("/admin/clients");
    } else if (profile === "CLIENT") {
      navigate("/clients/dashboard/" + family_name);
    }
  };

  const isUserAlreadySignedIn = async () => {
    fetchUserAttributes()
      .then((user) => {
        const { profile, family_name = "", given_name, sub = "" } = user;
        if (profile === "CLIENT") {
          getUser({ userId: sub, taskId: family_name }).then((response) => {
            if (response?.permission === "no") {
              navigate("/clients/progress/" + family_name);
            } else {
              navigate("/clients/dashboard/" + family_name);
            }
          });
          return;
        }


        if (profile === "IMPLANTATION") {
          navigate("/client-id/" + given_name)
          return
        }

        navigate("/admin/clients");
      })
      .catch(() => { });
  };

  const handleLogin = async () => {
    setProcessing(true);
    signIn({
      username: email,
      password: password,
    })
      .then(async (response) => {
        if (response.isSignedIn) {
          const user = await fetchUserAttributes();

          const { profile, family_name = "", given_name, sub = "" } = user;
          if (profile === "CLIENT") {
            getUser({ userId: sub, taskId: family_name }).then((response) => {
              if (response?.permission === "no") {
                navigate("/clients/progress/" + family_name);
              } else {
                navigate("/clients/dashboard/" + family_name);
              }
              return;
            });
          }

          if (profile === "IMPLANTATION") {
            navigate("/client-id/" + given_name)
            return
          }

          navigate("/admin/clients");
          return;
        }

        if (
          response.nextStep.signInStep ===
          "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          setLoginStage("NEW-PASSWORD");
        }
      })
      .catch((response: any) => {
        setError(response?.message);
        toast({
          description: "Erro ao realizar login, tente novamente!",
          status: "error",
        });
      })
      .finally(() => setProcessing(false));
  };

  const handleConfirmSignIn = async () => {
    if (newPasswords.password1 !== newPasswords.password2) {
      toast({
        description: "Senhas diferentes! Tente novamente",
        status: "error",
      });

      return;
    }

    if (confirmationCode) {
      confirmResetPassword({
        confirmationCode,
        username: email,
        newPassword: newPasswords.password2,
      }).then(() => {
        toast({
          description: "Senha redefinida com sucesso!",
          status: "success",
        });
        setLoginStage("LOGIN");
      });
      return;
    }

    confirmSignIn({ challengeResponse: newPasswords.password1 })
      .then(async (response) => {
        setProcessing(true);

        if (response.isSignedIn) {
          const user = await fetchUserAttributes();

          const { profile, family_name, given_name } = user;

          if (profile === "ADMIN") {
            navigate("/admin");
            return
          }

          if (profile === "IMPLANTATION") {
            navigate("/client-id/" + given_name)
            return
          }

          if (profile === "CLIENT") {
            navigate("/clients/dashboard/" + family_name);
            return;
          }
        }
      })
      .catch((response) => {
        toast({
          status: "error",
          description: response?.message || "Erro!",
        });
      })
      .finally(() => setProcessing(false));
  };

  const handlePressEnter = (key: string) => {
    if (key === "Enter" && loginStage === "LOGIN") {
      handleLogin();
    }
  };

  useEffect(() => {
    isUserAlreadySignedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetPassword = () => {
    resetPassword({ username: email })
      .then(() => {
        toast({
          description:
            "Um código foi enviado em seu email de cadastro, confira-o e digite no próximo passo",
        });
        setLoginStage("CONFIRM_RESET_PASSWORD_WITH_CODE");
      })
      .catch((response) => {
        toast({
          description: response.message,
          status: "error",
        });
      });
  };

  const handleCancelPasswordReset = () => {
    setLoginStage("LOGIN");
  };

  const renderLogin = () => {
    return (
      <Flex
        boxShadow={"0 0 15px lightgray"}
        flexDirection={"column"}
        padding={"30px"}
        borderRadius={"8px"}
        background={"white"}
        gap="20px"
        w="23rem"
      >
        <Text mb="unset">
          Email
          <Input
            onChange={(e) => setEmail(e.target.value)}
            border={"1px solid lightgray"}
          />
        </Text>
        <Flex flexDirection={"column"} position={"relative"}>
          <Text mb="unset">Senha</Text>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e.key)}
            type={showPass ? "text" : "password"}
            border={"1px solid lightgray"}
          />
          <Button
            onClick={() => setShowPass((prev) => !prev)}
            position={"absolute"}
            padding={"unset"}
            background={"transparent"}
            _hover={{ background: "transparent" }}
            right="0.2rem"
            bottom="0"
            zIndex={1}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </Flex>
        <Button onClick={handleLogin} background={colors.yellow} mt="30px">
          {processing ? <Spinner /> : "Entrar"}
        </Button>

        {error && <Text color={"red"}>{error}</Text>}
        {/* <Flex flexDirection={"column"} gap="0.5rem">
          <Flex
            onClick={() => setLoginStage("CONFIRM-EMAIL")}
            width={"100%"}
            fontSize={11}
            justifyContent={"center"}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            <Text>Esqueci a senha</Text>
          </Flex>
        </Flex> */}
      </Flex>
    );
  };

  const renderConfirmEmailAndSendCode = () => {
    return (
      <Flex
        boxShadow={"0 0 15px lightgray"}
        flexDirection={"column"}
        padding={"30px"}
        borderRadius={"8px"}
        background={"#ffffffc7"}
        gap="20px"
        w="23rem"
      >
        <Text>
          Confirme o email que será enviado o código para alteração de senha:
        </Text>
        <Text>
          Email
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            border="1px solid lightgray"
          />
        </Text>

        <Flex
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          onClick={handleCancelPasswordReset}
        >
          <Button>Cancelar</Button>
          <Button
            onClick={handleResetPassword}
            background={colors.yellow}
            disabled={!confirmationCode.length}
          >
            {processing ? <Spinner /> : "Confirmar e Enviar"}
          </Button>
        </Flex>
      </Flex>
    );
  };

  const renderShowChangePassword = () => {
    return (
      <Flex
        boxShadow={"0 0 20px lightgray"}
        flexDirection={"column"}
        padding={"30px"}
        borderRadius={"8px"}
        background={"#ffffffc7"}
        gap="20px"
        w="25%"
        position={"relative"}
      >
        <Button
          onClick={() => setShowPass((prev) => !prev)}
          position={"absolute"}
          padding={"unset"}
          background={"transparent"}
          _hover={{ background: "transparent" }}
          right="2rem"
          top="3.4rem"
          zIndex={2}
        >
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </Button>
        <Text>
          Criar senha
          <Input
            type={showPass ? "text" : "password"}
            value={newPasswords.password1}
            border={"1px solid lightgray"}
            onChange={(e) =>
              setNewPasswords({ ...newPasswords, password1: e.target.value })
            }
          />
        </Text>

        <Text>
          Confirmar senha
          <Input
            type={showPass ? "text" : "password"}
            border={"1px solid lightgray"}
            value={newPasswords.password2}
            onChange={(e) =>
              setNewPasswords({ ...newPasswords, password2: e.target.value })
            }
          />
        </Text>
        <Text fontSize={10}>
          A nova senha precisa ter no mínimo 8 caracteres. 1 número, 1 letra
          minúscula, 1 letra maiúscula, 1 caractere especial
        </Text>
        <Button
          onClick={handleConfirmSignIn}
          background={colors.yellow}
          mt="30px"
        >
          {processing ? <Spinner /> : "Confirmar"}
        </Button>
        <Button onClick={() => setLoginStage("LOGIN")}>Cancelar</Button>
      </Flex>
    );
  };

  const handleSendConfirmationCode = () => {
    setLoginStage("NEW-PASSWORD");
  };

  const renderTypeResetPasswordCode = () => {
    return (
      <Flex
        boxShadow={"0 0 15px lightgray"}
        flexDirection={"column"}
        padding={"30px"}
        borderRadius={"8px"}
        background={"#ffffffc7"}
        gap="20px"
        w="23rem"
      >
        <Text>Insira o código enviado em seu email:</Text>

        <Flex flexDirection={"column"} position={"relative"}>
          <Text>Código</Text>
          <Input
            onChange={(e) => setConfirmationCode(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e.key)}
            border={"1px solid lightgray"}
          />
        </Flex>
        <Flex
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Button onClick={handleCancelPasswordReset}>Cancelar</Button>
          <Button
            onClick={handleSendConfirmationCode}
            background={colors.yellow}
            disabled={!confirmationCode.length}
          >
            {processing ? <Spinner /> : "Enviar"}
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      w="100%"
      h="100vh"
      background={"white"}
    >
      <Flex padding={"20px"}>
        <Image src={Logo} height={"40px"} />
      </Flex>
      {loginStage === "LOGIN" && renderLogin()}
      {loginStage === "CONFIRM_RESET_PASSWORD_WITH_CODE" &&
        renderTypeResetPasswordCode()}
      {loginStage === "NEW-PASSWORD" && renderShowChangePassword()}
      {loginStage === "CONFIRM-EMAIL" && renderConfirmEmailAndSendCode()}
    </Flex>
  );
};
