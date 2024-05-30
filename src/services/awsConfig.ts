import { Amplify } from "aws-amplify";

const apiName = import.meta.env.VITE_API_GATEWAY_NAME;
const apiUrl = import.meta.env.VITE_API_GATEWAY_URL;
const region = import.meta.env.VITE_COGNITO_REGION;

const existingConfig = Amplify.getConfig();

export const awsConfig = {
  ...existingConfig,

  Auth: {
    Cognito: {
      region: region,
      userPoolEndpoint: import.meta.env.VITE_COGNITO_ENDPOINT,
      userPoolId: import.meta.env.VITE_COGNITO_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_POOL_WEB_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      allowGuestAccess: true,
    },
  },
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,

      [apiName]: {
        endpoint: apiUrl,
        region: region,
      },
    },
  },
};
