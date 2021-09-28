# Deployment using Circleci
1. Connect your repo to circleci
1. Important! Set AWS_CERTIFICATE_ARN env var on circleci after first deploy to not recreate certificate on aws
1. Add `SENTRY_DSN` env variable on circleci project's config page
   https://app.circleci.com/settings/project/github/{ORG_NAME}/{REPO_NAME}/environment-variables
   #### To get `REACT_APP_SENTRY_DSN` variable
   - Create a `REACT` project on [Sentry](https://sentry.io/organizations/tidepoollabs/projects/new/)
   - Get the DSN from `Client Keys` page
1. Update the **.circleci/config.yml**
   file to set branches to deploy. these branches will deploy by default
    ```yaml
    branches:
      only:
        - develop
        - staging
        - master
    ```
1. Set the environment variables based on git branch on **.circleci/env-setup.sh** file
    - `DOMAIN_NAME` is the domain where the website will be published
    - `SUBDOMAIN_NAME` is the subdomain based on git branch. Generally it should be `www` for `master` branch
    - `STACK_REGION` is the AWS stack region where the branch will be deployed. There is some limitation of stack counts per region, so it should be unique per branch.
    - `APP_NAME` is the stack name on AWS, so it should be unique per branch.
    - `REACT_APP_GQL_ROOT` backend's graphql url

# Deployment from local machine
1. Copy the `env.sh.template` into `env.sh` file and set the env varables (as specified on circleci section)
1. run `npm run deploy`
