#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { WebsiteStack } = require('../lib/website-stack');
const Utils = require('../utils');

const app = new cdk.App();
const stackProps = {
  env: {
    account: Utils.getEnv("STACK_ACCOUNT"),
    region: Utils.getEnv("STACK_REGION"),
  }
};
const websiteStack = new WebsiteStack(app, Utils.prefixByAppName('WebsiteStack'), stackProps);

app.synth();
