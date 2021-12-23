/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  async redirects() {
    return [
      {
        source: "/blogs/category/:category",
        destination: "/blogs/category/:category/page/1",
        permanent: false,
      },
      {
        source: "/blogs/author/:author",
        destination: "/blogs/author/:author/page/1",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blogs/page/1",
        permanent: true,
      },
    ];
  },
};
