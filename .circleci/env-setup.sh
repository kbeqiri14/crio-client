# SENTRY_DSN env should be set on circleci

{
  echo "export STACK_ACCOUNT=$(aws sts get-caller-identity --query "Account" --output text)"
  echo "export NODE_ENV=production"
  echo "export DOMAIN_NAME=tlabs.app"
} >> "$BASH_ENV"

if [ "${CIRCLE_BRANCH}" == "develop" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-qa-api.tlabs.app/prod/graphql/"
    echo "export SUBDOMAIN_NAME=crio-qa"
    echo "export STACK_REGION=us-west-1"
    echo "export APP_NAME=crio-development"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-1_orM3G9iAn"
    echo "export REACT_APP_COGNITO_DOMAIN=https://crio-development-auth.auth.us-west-1.amazoncognito.com"
    echo "export REACT_APP_COGNITO_CLIENT_ID=4qv5v7d6474fvrdakt08d7b8gd"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-staging-api.tlabs.app/prod/graphql/"
    echo "export SUBDOMAIN_NAME=crio-staging"
    echo "export STACK_REGION=us-west-2"
    echo "export APP_NAME=crio-staging"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-api.tlabs.app/prod/graphql/"
    echo "export SUBDOMAIN_NAME=crio"
    echo "export STACK_REGION=us-east-2"
    echo "export APP_NAME=crio-production"
  } >> "$BASH_ENV"
else
  #should not be executed
  echo "check your branch condition"
fi