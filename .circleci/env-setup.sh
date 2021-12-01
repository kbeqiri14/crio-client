# SENTRY_DSN env should be set on circleci

{
  echo "export STACK_ACCOUNT=$(aws sts get-caller-identity --query "Account" --output text)"
  echo "export NODE_ENV=production"
  echo "export DOMAIN_NAME=criointeractive.com"
} >> "$BASH_ENV"

if [ "${CIRCLE_BRANCH}" == "develop" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-qa-api.criointeractive.com/graphql/"
    echo "export SUBDOMAIN_NAME=crio-qa"
    echo "export STACK_REGION=us-west-1"
    echo "export APP_NAME=crio-development"
    echo "export REACT_APP_COGNITO_REGION=us-west-2"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=1b76ir6odhsf56d9u051hfvu43"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-2_JVspvFNBB"
    echo "export REACT_APP_COGNITO_DOMAIN1=crio-development-auth.auth.us-west-2.amazoncognito.com"
    echo "export REACT_APP_FB_APP_ID=644393000298985"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-staging-api.criointeractive.com/graphql/"
    echo "export SUBDOMAIN_NAME=crio-staging"
    echo "export STACK_REGION=us-west-2"
    echo "export APP_NAME=crio-staging"
    echo "export REACT_APP_COGNITO_REGION=us-west-2"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=5nl699lvu2gmhat36pita5he9c"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-2_ALXn4YGWa"
    echo "export REACT_APP_COGNITO_DOMAIN1=crio-staging-auth.auth.us-west-2.amazoncognito.com"
    echo "export REACT_APP_FB_APP_ID=1945366748964292"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api.criointeractive.com/graphql/"
    echo "export SUBDOMAIN_NAME=www"
    echo "export STACK_REGION=us-east-1"
    echo "export APP_NAME=crio-production"
    echo "export REACT_APP_COGNITO_REGION=us-east-1"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=4tbsus65cn0tf9dhgm24hcu9jr"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-east-1_YZ6lPT7YV"
    echo "export REACT_APP_COGNITO_DOMAIN1=https://crio-production-auth.auth.us-east-1.amazoncognito.com"
    echo "export REACT_APP_FB_APP_ID=1945366748964292"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/4gw4ib1fXggn0KcdQQ"
  } >> "$BASH_ENV"
else
  #should not be executed
  echo "check your branch condition"
fi
