import { Amplify } from "aws-amplify";
import { get, put, post, del } from "@aws-amplify/api";
import { useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { awsConfig } from "../services/awsConfig";

Amplify.configure(awsConfig);

interface IuseApi {
  path: string;
}

interface IHTTPRequest {
  method: "get" | "post" | "put" | "del";
  queryStringParameters?: Record<string, string> | undefined | any;
  pathParameters?: string | undefined;
  body?: any;
  headers?: any;
}

export const useApi = ({ path }: IuseApi) => {
  const [processing, setProcessing] = useState<boolean>(false);

  const apiName = import.meta.env.VITE_API_GATEWAY_NAME;

  const request = async ({
    method,
    queryStringParameters = {},
    pathParameters = "",
    body,
  }: IHTTPRequest) => {
    setProcessing(true);

    const authToken: any = await fetchAuthSession().then((response) => {
      return response.tokens?.accessToken?.toString();
    });

    switch (method) {
      case "get": {
        try {
          const data = get({
            apiName,
            path: path + pathParameters,
            options: {
              queryParams: queryStringParameters,
              body,
              headers: authToken
                ? { Authorization: "Bearer " + authToken }
                : {},
            },
          });

          const response = await data.response;

          setProcessing(false);
          return response.body.json() as any;
        } catch (error) {
          console.log(error);
          setProcessing(false);

          throw new Error();
        }
      }
      case "post": {
        try {
          const data = post({
            apiName,
            path: path + pathParameters,
            options: {
              queryParams: queryStringParameters,
              body,
              headers: authToken
                ? { Authorization: "Bearer " + authToken }
                : {},
            },
          });

          const response = await data.response;

          setProcessing(false);
          return response.body.json() as any;
        } catch (error: any) {
          console.log("ERRO AQUI ", error);
          setProcessing(false);
          throw new Error(error.message);
        }
      }

      case "del": {
        let response;
        try {
          const data = del({
            apiName,
            path: path + pathParameters,
            options: {
              headers: authToken
                ? { Authorization: "Bearer " + authToken }
                : {},
              queryParams: queryStringParameters,
            },
          });

          response = await data.response;

          return response as any;
        } catch (error) {
          throw new Error();
        } finally {
          setProcessing(false);
        }
      }

      case "put": {
        try {
          const data = put({
            apiName,
            path: path + pathParameters,
            options: {
              queryParams: queryStringParameters,
              body,
              headers: authToken
                ? { Authorization: "Bearer " + authToken }
                : {},
            },
          });

          const response = await data.response;

          return response as any;
        } catch (error) {
          throw new Error();
        } finally {
          setProcessing(false);
        }
      }
    }
  };

  return { request, processing };
};
