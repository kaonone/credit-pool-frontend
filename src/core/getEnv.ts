import * as packageJson from '../../package.json';

export function getEnv() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isStaging = process.env.IS_STAGING === 'true';
  const forGhPages = true;
  const appVersion = packageJson.version;
  const withHot = !!module.hot && isDevelopment;
  const isMockServer = false;

  return {
    isProduction,
    isDevelopment,
    isStaging,
    forGhPages,
    withHot,
    appVersion,
    isMockServer,
  };
}
