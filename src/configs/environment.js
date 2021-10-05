export const env = process.env.REACT_APP_ENV;
export const isOnProduction = env === 'production';
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const GRAPHQL_ROOT = process.env.REACT_APP_GQL_ROOT;

// cognito
export const COGNITO_REGION = process.env.REACT_APP_COGNITO_REGION;
export const COGNITO_APP_CLIENT_ID = process.env.REACT_APP_COGNITO_APP_CLIENT_ID;
export const COGNITO_USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;
export const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN1;
export const COGNITO_REDIRECT_SIGN_IN = process.env.REACT_APP_COGNITO_REDIRECT_SIGN_IN;
export const COGNITO_REDIRECT_SIGN_OUT = process.env.REACT_APP_COGNITO_REDIRECT_SIGN_OUT;

//social
export const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
