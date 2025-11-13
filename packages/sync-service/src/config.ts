import 'dotenv/config';

const DEFAULT_ENDPOINT = 'mainnet.lightwalletd.com:9067';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  lightwalletdEndpoint: process.env.LIGHTWALLETD_ENDPOINT ?? DEFAULT_ENDPOINT,
  tlsDomain: process.env.LIGHTWALLETD_TLS_DOMAIN ?? DEFAULT_ENDPOINT.split(':')[0]
};

