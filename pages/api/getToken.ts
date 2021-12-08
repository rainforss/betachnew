import type { NextApiRequest, NextApiResponse } from "next";
import cca from "../../utils/cca";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";

type Data = {
  accessToken?: string;
};

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  res.status(200).json({ accessToken });
}
