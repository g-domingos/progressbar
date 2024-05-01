import { Buffer } from "buffer";
import {
  Text,
  Flex,
  useToast,
  useDisclosure,
  Button,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { GenericPage } from "../../components/GenericPage";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { blingIntegrationForm } from "../../forms/formValidation";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { colors } from "../../styles/theme";
import { useApi } from "../../hooks/useApi";

export const BlingIntegration = () => {
  const location = useLocation();
  const params = useParams();

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { request, processing } = useApi({ path: `/integration/${params.id}` });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(blingIntegrationForm),
    values: {},
  });

  const toast = useToast();

  const onClose = () => {};

  const postData = ({ values }: any) => {
    return request({
      method: "post",
      body: values,
      queryStringParameters: { cnpjId: params.cnpjId || "" },
    });
  };

  const postBlingCode = ({ values }: any) => {
    return request({ method: "post", body: values });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Link de redirecionamento copiado com sucesso!",
      status: "success",
    });
  };

  const onSubmit = (values: any) => {
    if (processing) return;

    const encryptedAuth = Buffer.from(
      `${values.clientId}:${values.clientSecret}`
    ).toString("base64");

    values.encryptedAuth = encryptedAuth;

    delete values.clientId;
    delete values.clientSecret;

    postData({ values }).then((response) => {
      toast({ description: "Salvo com sucesso!" });
      localStorage.setItem("apiId", response.apiId);
      window.open(values.inviteLink);
    });
  };

  useEffect(() => {
    if (location.search.includes("code") && !processing) {
      setIsAuthenticating(true);

      const code = searchParams.get("code");

      const apiId = localStorage.getItem("apiId") || "";
      const cnpjId = String(params.cnpjId) || "";

      request({
        method: "post",
        pathParameters: "/code",
        body: { code },
        queryStringParameters: { apiId, cnpjId },
      }).then((response) => {
        toast({ description: "Integração realizada com sucesso!" });
        localStorage.setItem("apiId", "");

        // navigate(`/admin/task-settings/${params.id}`);
      });
    }
  }, []);

  return (
    <GenericPage title={"Integração Bling"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        {isAuthenticating ? (
          <Flex
            width={"100%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection={"column"}>
              <Flex>
                <Flex
                  flexDirection={"column"}
                  css={{ p: { marginBottom: "unset" } }}
                >
                  <Text>
                    Copie e cole o link abaixo no campo "URL de Redirecionamento
                    do App"
                  </Text>
                  <Text>{window.location.href}</Text>
                </Flex>
                <Button onClick={() => handleCopy(window.location.href)}>
                  <AiOutlineCopy />
                </Button>
              </Flex>
              <Text>
                Cole o Link de Convite
                <Input {...register("inviteLink")} />
                {errors["inviteLink"] && (
                  <Text
                    fontSize={12}
                    color="red"
                    mb="unset"
                    paddingLeft={"10px"}
                  >
                    {errors?.["inviteLink"].message as any}
                  </Text>
                )}
              </Text>

              <Text>
                Insira o Client Id
                <Input {...register("clientId")} />
                {errors["clientId"] && (
                  <Text
                    fontSize={12}
                    color="red"
                    mb="unset"
                    paddingLeft={"10px"}
                  >
                    {errors?.["clientId"].message as any}
                  </Text>
                )}
              </Text>

              <Text>
                Insira o Client Secret
                <Input {...register("clientSecret")} />
                {errors["clientSecret"] && (
                  <Text
                    fontSize={12}
                    color="red"
                    mb="unset"
                    paddingLeft={"10px"}
                  >
                    {errors?.["clientSecret"].message as any}
                  </Text>
                )}
              </Text>
            </Flex>
            <Flex className="footer" justifyContent={"flex-end"}>
              <Button variant="ghost" mr={3} onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button background={colors.yellow} type="submit">
                {processing ? <Spinner /> : "Salvar"}
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </GenericPage>
  );
};
