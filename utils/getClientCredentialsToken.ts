import { ConfidentialClientApplication } from "@azure/msal-node";

export const getClientCredentialsToken = async (
  cca: ConfidentialClientApplication
) => {
  try {
    const clientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: true,
    };
    const response = await cca.acquireTokenByClientCredential(
      clientCredentialRequest
    );

    return response;
  } catch (error) {
    throw error;
  }
};
