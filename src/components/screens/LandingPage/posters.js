import poster1 from '@images/posters/sample-poster-1.png';
import poster2 from '@images/posters/sample-poster-2.png';
import poster3 from '@images/posters/sample-poster-3.png';
import poster4 from '@images/posters/sample-poster-4.png';
import poster5 from '@images/posters/sample-poster-5.png';
import poster6 from '@images/posters/sample-poster-6.png';
import poster7 from '@images/posters/sample-poster-8.png';
import poster9 from '@images/posters/sample-poster-9.png';
import poster10 from '@images/posters/sample-poster-10.png';
import { shuffleArray } from '@utils/helpers';

export const posters = [
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster6,
  poster7,
  poster9,
  poster10,
];

export const getPosters = (count) => {
  const shouldTake = Math.floor(count / posters.length);
  const additional = count % posters.length;
  const list = new Array(shouldTake).fill(posters).flat().concat(posters.slice(0, additional));

  shuffleArray(list);

  return list;
};
