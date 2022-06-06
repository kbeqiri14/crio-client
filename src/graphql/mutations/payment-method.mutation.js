import { gql } from '@apollo/client';

export const updatePaymentMethod = gql`
  mutation updatePaymentMethod($attributes: PaymentMethodAttributes!) {
    updatePaymentMethod(attributes: $attributes)
  }
`;
