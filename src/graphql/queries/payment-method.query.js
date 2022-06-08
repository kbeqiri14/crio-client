import { gql } from '@apollo/client';

export const getConnectAccount = gql`
  query {
    getConnectAccount {
      charges_enabled
      details_submitted
    }
  }
`;

export const getConnectOnboardingLink = gql`
  query {
    getConnectOnboardingLink {
      url
    }
  }
`;

export const getConnectLoginLink = gql`
  query {
    getConnectLoginLink {
      url
    }
  }
`;

export const deleteStripeAccount = gql`
  query {
    deleteStripeAccount
  }
`;
