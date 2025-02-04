source ./env.sh
export CI=false

set -o nounset
set -o errexit
set -o xtrace

echo "configuring aws"
npx cdk bootstrap aws://"$STACK_ACCOUNT"/"$STACK_REGION"
npx cdk deploy --all --require-approval=never

echo "deploying client"
npm install --include=dev --legacy-peer-deps
echo "----env vars -----"
echo "----end env vars -----"

npm run build --openssl-legacy-provider --max-old-space-size=4096

if [ -z ${BUCKET_NAME+x} ]
then
      bucket="$APP_NAME"-website
else
      bucket=$BUCKET_NAME
fi
echo $bucket
aws s3 cp build s3://"$bucket"/ --recursive

npm run generate-config -- "${APP_NAME}" "${STACK_REGION}" ./invalidate-cache.sh;
