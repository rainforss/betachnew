import { cachePluginFunc } from "./cachePlugin";
import { Configuration } from "@azure/msal-node";

//This part runs in the server, use commonjs import
const msal = require("@azure/msal-node");

const cacheLocation = "./data/cache.json";

const cachePlugin = cachePluginFunc(cacheLocation);

const clientConfig: Configuration = {
  auth: {
    clientId: "24c804f6-d1ae-47f4-8e5a-644d7eb6d7f8",
    authority:
      "https://login.microsoftonline.com/0ec9a656-9268-4720-abb2-bab4029df654",
    clientSecret: "~iv7Q~dfK1nTb1DUdPVRUW7wS4E0EGRO-loAR",
  },
  cache: {
    cachePlugin,
  },
};

const confidentialClientApplication = new msal.ConfidentialClientApplication(
  clientConfig
);

export default confidentialClientApplication;
