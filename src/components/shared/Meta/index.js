import { Helmet } from 'react-helmet';
import defaultAvatar from '@images/avatar.png';

export const Meta = ({
  title = 'Crio',
  description = 'Crio is a leading community platform for creatives to showcase their work and interact with fans across the globe',
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
