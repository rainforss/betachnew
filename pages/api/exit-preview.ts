import { NextApiRequest, NextApiResponse } from "next";

const exit = async (req: NextApiRequest, res: NextApiResponse) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();
  const { pathName } = req.query;

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: decodeURIComponent(pathName as string) });
  res.end();
};

export default exit;
