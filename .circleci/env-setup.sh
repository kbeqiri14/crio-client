# SENTRY_DSN env should be set on circleci

{
  echo "export STACK_ACCOUNT=$(aws sts get-caller-identity --query "Account" --output text)"
  echo "export NODE_ENV=production"
  echo "export DOMAIN_NAME=crio.live"
} >> "$BASH_ENV"

if [ "${CIRCLE_BRANCH}" == "develop" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-qa-api.crio.live/graphql/"
    echo "export SUBDOMAIN_NAME=crio-qa"
    echo "export STACK_REGION=us-east-1"
    echo "export APP_NAME=crio-development"
    echo "export REACT_APP_COGNITO_REGION=us-east-1"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=419fbu51vuhjgjbua2ivpkjkat"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-east-1_1IAZmqxze"
    echo "export REACT_APP_COGNITO_DOMAIN=crio-development-transferred-auth.auth.us-east-1.amazoncognito.com"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
    echo "export REACT_APP_GTAG=UA-215522581-1"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-staging-api.crio.live/graphql/"
    echo "export SUBDOMAIN_NAME=crio-staging"
    echo "export STACK_REGION=us-west-2"
    echo "export APP_NAME=crio-in-staging"
    echo "export REACT_APP_COGNITO_REGION=us-west-2"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=49dblm50ird6105qvaaj8ie9bd"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-2_rIf40f9kz"
    echo "export REACT_APP_COGNITO_DOMAIN=crio-in-staging-auth.auth.us-west-2.amazoncognito.com"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
    echo "export REACT_APP_GTAG=UA-215522581-1"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api.crio.live/graphql/"
    echo "export SUBDOMAIN_NAME=www"
    echo "export STACK_REGION=us-east-1"
    echo "export APP_NAME=crio-production"
    echo "export REACT_APP_COGNITO_REGION=us-east-1"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=4tbsus65cn0tf9dhgm24hcu9jr"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-east-1_YZ6lPT7YV"
    echo "export REACT_APP_COGNITO_DOMAIN=oauth.crio.live"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/4gw4ib1fXggn0KcdQQ"
    echo "export BUCKET_NAME=crio.live"
    echo "export REACT_APP_GTAG=UA-215590535-1"
  } >> "$BASH_ENV"
else
  #should not be executed
  echo "check your branch condition"
fi
