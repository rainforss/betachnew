import { ConfidentialClientApplication } from "@azure/msal-node";

export const getClientCredentialsToken = async (
  cca: ConfidentialClientApplication
) => {
  try {
    const clientCredentialRequest = {
      scopes: ["https://betachplayground.crm.dynamics.com/.default"],
      skipCache: false,
    };
    const response = await cca.acquireTokenByClientCredential(
      clientCredentialRequest
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
