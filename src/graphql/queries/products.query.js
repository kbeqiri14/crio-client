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
      type
      mainCategoryId
    }
  }
`;

export const getUserProducts = gql`
  query getUserProducts($params: UserAttributesParams!) {
    getUserProducts(params: $params) {
      ...ProductDetailAttributes
    }
  }
  ${productFragment}
`;

export const getTopProducts = gql`
  query {
    getTopProducts {
      ...ProductDetailAttributes
    }
  }
  ${productFragment}
`;

export const getRandomInfo = gql`
  query getRandomInfo($params: SearchParams!) {
    getRandomInfo(params: $params) {
      productsCount
      artworksCount
    }
  }
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

export const getProductLikes = gql`
  query getProductLikes($productId: ID!) {
    getProductLikes(productId: $productId) {
      userId
    }
  }
`;
