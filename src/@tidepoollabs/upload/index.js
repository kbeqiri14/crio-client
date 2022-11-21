import { gql } from '@apollo/client';
import axios from 'axios';

export const s3SignMutation = gql`
  mutation ($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

export const uploadToS3 = async (file, signedRequest) => {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  };
  await axios.put(signedRequest, file, options);
};

export default class Upload {
  constructor(graphqlClient) {
    this.client = graphqlClient;
  }

  async sign(filename, filetype) {
    const {
      data: { signS3 },
    } = await this.client.mutate({
      mutation: s3SignMutation,
      variables: {
        filename,
        filetype,
      },
    });
    return {
      url: signS3.url,
      signedRequest: signS3.signedRequest,
    };
  }

  async signForUpload(filename, filetype) {
    return this.sign(filename, filetype);
  }

  async signAndUpload(filename, filetype, file) {
    const { url, signedRequest } = await this.sign(filename, filetype);
    await uploadToS3(file, signedRequest);
    return url;
  }
}
