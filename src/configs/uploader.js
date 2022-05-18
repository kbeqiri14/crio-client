import Upload from '@tidepoollabs/upload';
import { client } from '../graphql/client';

export default new Upload(client);
