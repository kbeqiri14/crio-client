import { makeVar } from '@apollo/client';

export const loggedInUserVar = makeVar({});
export const loggedInUserLoadingVar = makeVar(false);
export const randomArtworkNumberVar = makeVar(1);
export const randomProductNumberVar = makeVar(1);
export const creatorIdsVar = makeVar([]);
export const signupErrorVar = makeVar(true);
export const searchKeywordVar = makeVar('');
export const refetchArtworkVar = makeVar(false);
export const refetchMarketplaceVar = makeVar(false);
export const productTypesVar = makeVar({
  digitalId: null,
  commissionId: null,
  productCategories: [],
});
