import { Fragment, memo } from 'react';

import PersonalInfo from '@screens/Account/__partials__/PersonalInfo';
import Details from '@screens/Account/Details';
import creator from '@images/creator.png';

const mockCreator = {
  firstName: 'Ann',
  lastName: 'Bee',
  username: 'allergic_designer',
  email: 'ann.bee@gmail.com',
  picture: creator,
};

export const Profile = () => {
  return (
    <Fragment>
      <PersonalInfo isProfile user={mockCreator} />
      <Details isProfile />
    </Fragment>
  );
};

export default memo(Profile);
