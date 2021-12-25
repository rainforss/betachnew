import { NextApiRequest, NextApiResponse } from "next";

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, pathName, pageType } = req.query;

  if (
    !process.env.D365_CMS_PREVIEW_SECRET ||
    secret !== process.env.D365_CMS_PREVIEW_SECRET ||
    !pathName
  ) {
    return res.status(401).json({ message: "Invalid token or path name" });
  }

  const previewPathName = decodeURIComponent(pathName as string);

  res.setPreviewData({}, { maxAge: 60 * 5 });

  if (pageType === "blog") {
    res.writeHead(307, { Location: `/blogs/${previewPathName}` });
    return res.end();
  }

  if (pageType === "blog display") {
    res.writeHead(307, { Location: "/blogs/page/1" });
  }

  if (pageType === "static") {
    res.writeHead(307, { Location: previewPathName });
    return res.end();
  }
};

export default preview;
