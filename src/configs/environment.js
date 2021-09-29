export const env = process.env.REACT_APP_ENV;
export const isOnProduction = env === 'production';
export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
export const GRAPHQL_ROOT = process.env.REACT_APP_GQL_ROOT;
