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
    echo "export STACK_REGION=us-west-1"
    echo "export APP_NAME=crio-development"
    echo "export REACT_APP_COGNITO_REGION=us-west-2"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=1b76ir6odhsf56d9u051hfvu43"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-2_JVspvFNBB"
    echo "export REACT_APP_COGNITO_DOMAIN=crio-development-auth.auth.us-west-2.amazoncognito.com"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
    echo "export REACT_APP_GTAG=UA-215522581-1"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "staging" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://crio-staging-api.crio.live/graphql/"
    echo "export SUBDOMAIN_NAME=crio-staging"
    echo "export STACK_REGION=us-west-2"
    echo "export APP_NAME=crio-staging"
    echo "export REACT_APP_COGNITO_REGION=us-west-2"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=5nl699lvu2gmhat36pita5he9c"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-west-2_ALXn4YGWa"
    echo "export REACT_APP_COGNITO_DOMAIN=auth.crio.live"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/test_aEU7w2ek11RycpO144"
    echo "export REACT_APP_GTAG=UA-215522581-1"
  } >> "$BASH_ENV"
elif [ "${CIRCLE_BRANCH}" == "master" ]
then
  {
    echo "export REACT_APP_GQL_ROOT=https://api.crio.live/graphql/"
    echo "export SUBDOMAIN_NAME=app"
    echo "export STACK_REGION=us-east-1"
    echo "export APP_NAME=crio-in-production"
    echo "export REACT_APP_COGNITO_REGION=us-east-1"
    echo "export REACT_APP_COGNITO_APP_CLIENT_ID=2gj4elpucbicbuc8eqbfdvnft9"
    echo "export REACT_APP_COGNITO_USER_POOL_ID=us-east-1_hY3WdkmUI"
    echo "export REACT_APP_COGNITO_DOMAIN=crio-in-production-auth.auth.us-east-1.amazoncognito.com"
    echo "export REACT_APP_STRIPE_PAYMENT_URL=https://buy.stripe.com/4gw4ib1fXggn0KcdQQ"
    echo "export BUCKET_NAME=crio.live"
    echo "export REACT_APP_GTAG=UA-215590535-1"
  } >> "$BASH_ENV"
else
  #should not be executed
  echo "check your branch condition"
fi
