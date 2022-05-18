import { gql } from '@apollo/client';

export const product_fragment = gql`
  fragment ProductDetailAttributes on ProductDetail {
    productId
    userId
    providerType
    providerUserId
    avatar
    name
    type
    title
    description
    price
    limit
    accessibility
    thumbnail
  }
`;

export const getProduct = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      ...ProductDetailAttributes
    }
  }
  ${product_fragment}
`;

export const getUserProducts = gql`
  query getUserProducts($username: String) {
    getUserProducts(username: $username) {
      ...ProductDetailAttributes
    }
  }
  ${product_fragment}
`;

export const getRandomProductsInfo = gql`
  query {
    getRandomProductsInfo {
      count
      products {
        ...ProductDetailAttributes
      }
    }
  }
  ${product_fragment}
`;

export const getRandomProducts = gql`
  query getRandomProducts($params: paginationParams!) {
    getRandomProducts(params: $params) {
      ...ProductDetailAttributes
    }
  }
  ${product_fragment}
`;
