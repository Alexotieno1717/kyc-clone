module.exports = {
    async rewrites() {
      return [
        {
          source: '/initiate-payment&',
          destination: 'http://197.248.4.233/mswali/mswali_app/backend/web/index.php?r=api',
        },
      ]
    },
  }