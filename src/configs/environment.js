export const env = process.env.REACT_APP_ENV;
export const isOnProduction = env === 'production';
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const GRAPHQL_ROOT = process.env.REACT_APP_GQL_ROOT;
export const STRIPE_ROOT = process.env.REACT_APP_STRIPE_ROOT;
export const STRIPE_PAYMENT_URL = process.env.REACT_APP_STRIPE_PAYMENT_URL;

// cognito
export const COGNITO_REGION = process.env.REACT_APP_COGNITO_REGION;
export const COGNITO_APP_CLIENT_ID = process.env.REACT_APP_COGNITO_APP_CLIENT_ID;
export const COGNITO_USER_POOL_ID = process.env.REACT_APP_COGNITO_USER_POOL_ID;
export const COGNITO_DOMAIN = process.env.REACT_APP_COGNITO_DOMAIN;
export const COGNITO_REDIRECT_SIGN_IN = `${window.location.origin}/cognito/callback`;
export const COGNITO_REDIRECT_SIGN_OUT = window.location.origin;

// Social Links
export const FACEBOOK_LINK = process.env.REACT_APP_FACEBOOK_LINK || 'https://facebook.com';
export const TWITTER_LINK = process.env.TWITTER_LINK || 'https://twitter.com';
export const INSTAGRAM_LINK = process.env.INSTAGRAM_LINK || 'https://instagram.com';
