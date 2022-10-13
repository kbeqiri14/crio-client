import { makeVar } from '@apollo/client';

export const loggedInUserVar = makeVar({});
export const loggedInUserLoadingVar = makeVar(false);
export const creatorIdsVar = makeVar([]);
export const signupErrorVar = makeVar(true);
export const searchProductCategoryVar = makeVar();
export const searchArtworkCategoryVar = makeVar();
export const searchKeywordVar = makeVar('');
export const refetchArtworkVar = makeVar(false);
export const refetchMarketplaceVar = makeVar(false);
export const categoriesVar = makeVar({
  digitalId: null,
  commissionId: null,
  products: [],
  contents: [],
});
