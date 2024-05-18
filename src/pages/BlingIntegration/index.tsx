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
  const navigate = useNavigate();

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { request, processing } = useApi({ path: `/integration/${params.id}` });

  const handleReturn = () => {
    const url = `/admin/task-settings/${params.id}`;
    navigate(url);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(blingIntegrationForm),
    values: {},
  });

  const toast = useToast();

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

        navigate(`/admin/task-settings/${params.id}`);
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
            <Flex flexDirection={"column"} gap="1rem" mt="1rem">
              <Flex>
                <Flex
                  flexDirection={"column"}
                  css={{ p: { marginBottom: "unset" } }}
                >
                  <Text>Passo a passo:</Text>
                  <Text>
                    1º - Com essa guia aberta, entre na conta Bling do cliente.
                  </Text>
                  <Text>
                    2º - Crie um aplicativo.
                  </Text>
                  <Text>
                    3º - Ao criar o aplicativo, terá um
                    campo com o nome "URL de Redirecionamento do App". Neste
                    campo, copie e cole o link abaixo:
                  </Text>
                  <Flex alignItems={"center"}>
                    <Text>{window.location.href}</Text>
                    <Button onClick={() => handleCopy(window.location.href)}>
                      <AiOutlineCopy />
                    </Button>
                  </Flex>
                </Flex>
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
              <Button
                variant="ghost"
                mr={3}
                onClick={handleReturn}
                type="button"
              >
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
