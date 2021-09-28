import Amplify, { Auth } from 'aws-amplify';

const cognitoConfig = {
  'cognitoUserPoolId': process.env.REACT_APP_COGNITO_USER_POOL_ID,
  'cognitoUserPoolAppClientId': process.env.REACT_APP_COGNITO_CLIENT_ID,
  'cognitoDomain': process.env.REACT_APP_COGNITO_DOMAIN,
  'region': process.env.REACT_APP_COGNITO_REGION,
};
const awsConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: cognitoConfig.region,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: cognitoConfig.cognitoUserPoolId,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: cognitoConfig.cognitoUserPoolAppClientId,
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,
    oauth: {
      domain: cognitoConfig.cognitoDomain,
      scope: ['email', 'openid', 'profile'],
      responseType: 'code', // or token
      // optional, for Cognito hosted ui specified options
      options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag: true,
      },
    },
  },
};

Amplify.configure(awsConfig);

class User {
  _user = null;

  constructor(user) {
    this._user = user;
  }

  get groups() {
    return this._user.signInUserSession.accessToken.payload['cognito:groups'] ||
      [];
  }

  get attributes() {
    return this._user.attributes;
  }

  get jwtToken() {
    return this._user.signInUserSession.accessToken.jwtToken;
  }
}

export async function signUp(email, password) {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    });
    return new User(user);
  } catch (error) {
    console.log('error signing up:', error);
    return null;
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return new User(user);
  } catch (error) {
    console.log('error signing in', error);
    return null;
  }
}

export async function resendConfirmationCode(username) {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
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

(async () => {
  // await signIn('albert+patient@tidepoollabs.com', '1qaz!QAZ');
  // await signUp('albert+patient@tidepoollabs.com', '1qaz!QAZ');
  // await confirmSignUp('albert+patient@tidepoollabs.com', '299492');
  // await resendConfirmationCode('albert+patient@tidepoollabs.com');
})();

