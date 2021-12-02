const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const cloudfront = require('@aws-cdk/aws-cloudfront');
const route53 = require('@aws-cdk/aws-route53');
const targets = require('@aws-cdk/aws-route53-targets');
const Utils = require('../utils');

class WebsiteStack extends cdk.Stack {
  domainName;
  constructor(scope, id, props) {
    super(scope, id, props);

    const domainName = Utils.getEnv('DOMAIN_NAME');
    const subDomainName = Utils.getEnv('SUBDOMAIN_NAME');
    const {
      domainName: siteDomain,
      certificate,
      zone,
    } = Utils.configureDomain(this, domainName, subDomainName);
    new cdk.CfnOutput(this, 'Site', { value: 'https://' + siteDomain });

    // Content bucket
    let siteBucket;
    if (process.env.BUCKET_NAME) {
      siteBucket = s3.Bucket.fromBucketName(
        this,
        Utils.prefixByAppName('WebsiteBucket'),
        process.env.BUCKET_NAME,
      );
    } else {
      siteBucket = new s3.Bucket(this, Utils.prefixByAppName('WebsiteBucket'), {
        bucketName: Utils.prefixByAppName('website'),
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        publicReadAccess: true,

        // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
        // the new bucket, and it will remain in your account until manually deleted. By setting the policy to
        // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
        removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
      });
    }
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // TLS certificate
    const certificateArn = certificate.certificateArn;
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      Utils.prefixByAppName('SiteDistribution'),
      {
        aliasConfiguration: {
          acmCertRef: certificateArn,
          names: subDomainName === 'www' ? [domainName, siteDomain] : [siteDomain],
          sslMethod: cloudfront.SSLMethod.SNI,
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        },
        originConfigs: [
          {
            customOriginSource: {
              domainName: siteBucket.bucketWebsiteDomainName,
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      },
    );
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
    });
  }
}

module.exports = { WebsiteStack };
