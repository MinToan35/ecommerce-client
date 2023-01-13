/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   async rewrites() {
//     return [
//       {
//         source: "/",
//         destination: "http://localhost:5000/" // Proxy to Backend
//       }
//     ]
//   }
// }

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/:slug*",
        destination: "http://localhost:5000/:slug*" // Proxy to Backend
      }
    ]
  }
  return {
    rewrites
  }
}
