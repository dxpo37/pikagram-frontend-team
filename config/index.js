module.exports = {
  awsConfig: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
  },
  urls: {
    backendHost: process.env.DB_HOST,
    port: process.env.PORT,
  },
};
