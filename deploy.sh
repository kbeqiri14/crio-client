source ./env.sh
export CI=false

set -o nounset
set -o errexit
set -o xtrace

echo "configuring aws"
npx cdk bootstrap aws://"$STACK_ACCOUNT"/"$STACK_REGION"
npx cdk deploy --all --require-approval=never

echo "deploying client"
npm install --dev
echo "----env vars -----"
echo ${REACT_APP_COGNITO_REDIRECT_SIGN_IN}
echo ${$REACT_APP_COGNITO_REDIRECT_SIGN_OUT}
echo "----end env vars -----"

npm run build --max-old-space-size=4096
aws s3 cp build s3://"$APP_NAME"-website/ --recursive

npm run generate-config -- "${APP_NAME}" "${STACK_REGION}" ./invalidate-cache.sh;
