import type { NextApiRequest, NextApiResponse } from "next";
import cca from "../../utils/cca";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";

type Data = {
  accessToken?: string;
  error?: any;
};

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    res.status(200).json({ accessToken });
  } catch (error: any) {
    res.status(400).json({ error });
  }
}
