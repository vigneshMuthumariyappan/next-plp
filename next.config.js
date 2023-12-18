/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async redirects() {
      return [
        {
          source: '/:productKey',
          destination: 'http://local.travers.com.mx/:productKey',
          permanent: false,
        },
      ]
    },
    env: {
       MAGENTO_DOMAIN: 'http://local.travers.com.mx',
       MAGENTO_API_TOKEN: 'Bearer j94ocwunqkfc95bthz6hf64883oov2yh',
    }
  }
  