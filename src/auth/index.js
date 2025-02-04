import { Amplify, Auth } from 'aws-amplify';

import {
  COGNITO_APP_CLIENT_ID,
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_SIGN_IN,
  COGNITO_REDIRECT_SIGN_OUT,
} from '@app/configs/environment';
class User {
  _user = null;

  constructor(user) {
    this._user = user;
  }

  get attributes() {
    return this._user.attributes;
  }

  get jwtToken() {
    return this._user.signInUserSession.accessToken.jwtToken;
  }
}

Amplify.configure({
  Auth: {
    region: COGNITO_REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    userPoolWebClientId: COGNITO_APP_CLIENT_ID,
    oauth: {
      responseType: 'token',
      domain: COGNITO_DOMAIN,
      redirectSignIn: COGNITO_REDIRECT_SIGN_IN,
      redirectSignOut: COGNITO_REDIRECT_SIGN_OUT,
    },
  },
});

export async function signIn(provider) {
  try {
    await Auth.federatedSignIn({ provider });
  } catch (error) {
    console.log('error signing in: ', error);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
    localStorage.removeItem('user');
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

export async function getCurrentUser() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return new User(user);
  } catch (e) {
    return null;
  }
}
