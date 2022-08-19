import { Helmet } from 'react-helmet';
import defaultAvatar from '@images/avatar.png';

export const Meta = ({
  title = 'Crio',
  description = 'Discover thousands of digital products, custom services, and the best content from the entire community of creators on Crio',
  url = 'https://criointeractive.com/',
  imageUrl = defaultAvatar,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta property='og:url' content={url} />
    <meta property='og:image' content={imageUrl} />
    <meta property='twitter:url' content={url} />
    <meta property='twitter:image' content={imageUrl} />
  </Helmet>
);
