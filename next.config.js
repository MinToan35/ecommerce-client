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
        source: "/api_1.0/:slug*",
        destination: "http://localhost:5000/api_1.0/:slug*" // Proxy to Backend
      }
    ]
  }
  return {
    rewrites
  }
}
