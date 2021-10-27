import { Fragment, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { getUser } from '@app/graphql/queries/users.query';
import PersonalInfo from '@screens/Account/__partials__/PersonalInfo';
import Details from '@screens/Account/Details';
import { Spinner } from '../../UI-kit/Spinner';

export const Profile = () => {
  const { pathname } = useLocation();
  const { data, loading } = useQuery(getUser, {
    variables: { id: pathname.split('/')[2] },
  })

  return (
    <Fragment>
      <Spinner spinning={loading}>
        <PersonalInfo
          isProfile
          user={{
            ...data?.getUser,
            picture: data?.getUser?.firstName ? require(`../../../assets/images/mock-creators/${data?.getUser?.firstName}.png`).default : undefined,
          }}
        />
      </Spinner>
      <Details isProfile />
    </Fragment>
  );
};

export default memo(Profile);
