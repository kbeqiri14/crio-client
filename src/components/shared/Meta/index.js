import { Helmet } from 'react-helmet';

export const Meta = ({ description, title }) => (
  <Helmet>
    <title>{title}</title>
    <meta name='description' content={description} />
  </Helmet>
);
