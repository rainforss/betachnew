import {
  WebApiConfig,
  createWithReturnData,
  retrieveMultiple,
} from "dataverse-webapi/lib/node";
import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { instantiateCca } from "../../utils/msal/cca";
import { getClientCredentialsToken } from "../../utils/msal/getClientCredentialsToken";

const contactformsubmission = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    switch (req.method) {
      case "POST":
        const { recaptcha, bsi_contactid, ...entity } = JSON.parse(req.body);
        const result = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SERVER_SECRET}&response=${recaptcha}`,
          }
        );
        const resJson: any = await result.json();
        if (!resJson.success) {
          return res
            .status(400)
            .json({ error: { message: "reCAPTCHA check failed" } });
        }
        const cca = await instantiateCca();
        const tokenResponse = await getClientCredentialsToken(cca);
        const accessToken = tokenResponse?.accessToken;
        const config = new WebApiConfig(
          "9.1",
          accessToken,
          process.env.CLIENT_URL
        );

        if (bsi_contactid) {
          entity["bsi_MessageTo@odata.bind"] = `contacts(${bsi_contactid})`;
        }

        const existingContact = (
          await retrieveMultiple(
            config,
            "contacts",
            `$filter=emailaddress1 eq '${entity.bsi_email}'&$select=fullname`
          )
        ).value;

        if (existingContact.length > 0) {
          entity[
            "bsi_Contact@odata.bind"
          ] = `contacts(${existingContact[0].contactid})`;
        }

        const createResult = await createWithReturnData(
          config,
          "bsi_contactformsubmissions",
          entity,
          "$select=bsi_firstname,bsi_lastname"
        );
        if (createResult.error) {
          throw new Error((createResult.error as any).message);
        }
        return res.status(200).json({
          success: true,
          message: `Contact Form Submission created for ${createResult.bsi_firstname} ${createResult.bsi_lastname}`,
        });
      default:
        return res.status(400).json({
          error: { message: "Method not supported for this endpoint" },
        });
    }
  } catch (error: any) {
    return res.status(500).json({ error: { message: error.message } });
  }
};

export default contactformsubmission;
