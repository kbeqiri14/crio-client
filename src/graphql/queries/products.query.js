import { gql } from '@apollo/client';
import { productFragment } from '../fragments';

export const getProduct = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      ...ProductDetailAttributes
    }
  }
  ${productFragment}
`;

export const getCategories = gql`
  query {
    getCategories {
      id
      name
    }
  }
`;

export const getUserProducts = gql`
  query getUserProducts($username: String) {
    getUserProducts(username: $username) {
      ...ProductDetailAttributes
    }
  }
  ${productFragment}
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
  ${productFragment}
`;

export const getRandomProducts = gql`
  query getRandomProducts($params: paginationParams!) {
    getRandomProducts(params: $params) {
      ...ProductDetailAttributes
    }
  }
  ${productFragment}
`;

export const getMoreProducts = gql`
  query getMoreProducts($params: paginationParams!) {
    getMoreProducts(params: $params) {
      userProducts {
        ...ProductDetailAttributes
      }
      products {
        ...ProductDetailAttributes
      }
    }
  }
  ${productFragment}
`;

export const getStripeCheckoutSession = gql`
  query getStripeCheckoutSession($productId: ID!) {
    getStripeCheckoutSession(productId: $productId) {
      url
    }
  }
`;
