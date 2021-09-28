const exec = require('child_process').exec;
const Utils = require('./utils');


class GenerateConfig {

  async generateConfig(appName, stackRegion, filePath) {

    const outputsByName = new Map();
    await Promise.all(['WebsiteStack'].map(async stack => {
      const stackName = `${appName}-${stack}`;
      const outputs = await Utils.getStackOutputs(stackName, stackRegion);
      for (let output of outputs) {
        outputsByName.set(output.OutputKey, output.OutputValue);
      }
    }));

    const distributionId = outputsByName.get('DistributionId');
    const process = await exec(`
    export DISTRIBUTION_ID=${distributionId} &&
    chmod +x ${filePath} &&
    ${filePath}
    `);
    process.stdout.on('data', data => {
      console.log(data);
    });
    process.stderr.on( 'data', data => {
      console.error(data);
    } );
  }
}

const appName = process.argv[2];
if (!appName) {
  throw new Error("stack name is required");
}
const stackRegion = process.argv[3];
if (!stackRegion) {
  throw new Error("stack region is required");
}
const filePath = process.argv[4];
if (!filePath) {
  throw new Error("file path is required");
}

new GenerateConfig().generateConfig(appName, stackRegion, filePath);
