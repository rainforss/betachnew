import { cachePluginFunc } from "./cachePlugin";
import { Configuration } from "@azure/msal-node";

//This part runs in the server, use commonjs import
const msal = require("@azure/msal-node");

const cacheLocation = process.cwd() + "data/cache.json";

const cachePlugin = cachePluginFunc(cacheLocation);

const clientConfig: Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
  cache: {
    cachePlugin,
  },
};

const confidentialClientApplication = new msal.ConfidentialClientApplication(
  clientConfig
);

export default confidentialClientApplication;
