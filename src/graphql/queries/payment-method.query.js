import { gql } from '@apollo/client';
import { paymentMethodFragment } from '../fragments';

export const getPaymentMethod = gql`
  query {
    getPaymentMethod {
      ...PaymentMethodAttributes
    }
  }
  ${paymentMethodFragment}
`;
