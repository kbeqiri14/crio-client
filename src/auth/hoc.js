import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCurrentUser } from './hooks';

export const isAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useCurrentUser();
    if (loading) {
      return null;
    }
    if (!user) {
      return <Redirect to={'/'} />;
    }

    return <WrappedComponent {...props} />;
  };
};

export const isNotAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useCurrentUser();
    if (loading) {
      return null;
    }
    if (!!user) {
      return <Redirect to={`/profile${user?.username}`} />;
    }

    return <WrappedComponent {...props} />;
  };
};
