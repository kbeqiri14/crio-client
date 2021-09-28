# SENTRY_DSN env should be set on circleci

{
  echo "export STACK_ACCOUNT=$(aws sts get-caller-identity --query "Account" --output text)"
  echo "export NODE_ENV=production"
  echo "export DOMAIN_NAME=tlabs.app"
} >> "$BASH_ENV"

if [ "${CIRCLE_BRANCH}" == "develop" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api-qa-outbound.hcx.ai/prod/graphql/"
    echo "export SUBDOMAIN_NAME=qa-outbound"
    echo "export STACK_REGION=us-west-1"
    echo "export APP_NAME=outbound-development"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api-staging-outbound.hcx.ai/prod/graphql/"
    echo "export SUBDOMAIN_NAME=staging-outbound"
    echo "export STACK_REGION=us-west-2"
    echo "export APP_NAME=outbound-staging"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api-outbound.tlabs.app/prod/graphql/"
    echo "export SUBDOMAIN_NAME=outbound"
    echo "export STACK_REGION=us-east-2"
    echo "export APP_NAME=outbound-production"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-1_LwHEfHkyr"
    echo "export REACT_APP_COGNITO_DOMAIN=https://hcx-development-auth.auth.us-west-1.amazoncognito.com"
    echo "export REACT_APP_COGNITO_CLIENT_ID=6vsf1ka3ibovmk4en8rppnij8r"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "deploy" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api-deploy-outbound.tlabs.app/prod/graphql/"
    echo "export SUBDOMAIN_NAME=deploy-outbound"
    echo "export STACK_REGION=ca-central-1"
    echo "export APP_NAME=outbound-deploy"
  } >> "$BASH_ENV"
else
  #should not be executed
  echo "check your branch condition"
fi