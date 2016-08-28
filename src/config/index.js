export default {
  telegram: {
    token: process.env.TELEGRAM_TOKEN || '',
    externalUrl: process.env.CUSTOM_ENV_VARIABLE || '',
    port: process.env.PORT || 443,
    host: '0.0.0.0'
  }
};
