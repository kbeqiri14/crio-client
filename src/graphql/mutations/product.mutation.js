import { gql } from '@apollo/client';

export const createProduct = gql`
  mutation createProduct($attributes: Product!) {
    createProduct(attributes: $attributes)
  }
`;

export const updateProduct = gql`
  mutation updateProduct($attributes: Product!) {
    updateProduct(attributes: $attributes)
  }
`;

export const deleteProduct = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

export const likeProduct = gql`
  mutation likeProduct($productId: ID!) {
    likeProduct(productId: $productId)
  }
`;
