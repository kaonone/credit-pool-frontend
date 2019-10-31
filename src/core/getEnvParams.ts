import * as packageJson from '../../package.json';

export default function getEnvParams() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const forGhPages = true;
  const appVersion = packageJson.version;
  const withHot = !!module.hot && isDevelopment;

  console.log(withHot);

  return {
    isProduction,
    isDevelopment,
    forGhPages,
    withHot,
    appVersion,
  };
}
