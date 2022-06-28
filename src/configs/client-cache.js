import { makeVar } from '@apollo/client';

export const loggedInUserVar = makeVar({});
export const randomNumberVar = makeVar(1);
export const creatorIdsVar = makeVar([]);
export const signupErrorVar = makeVar(true);
export const searchKeywordVar = makeVar('');
export const refetchArtworkVar = makeVar(false);
export const refetchMarketplaceVar = makeVar(false);
