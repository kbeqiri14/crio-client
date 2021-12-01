/**
 * @desc Returns a random integer in defined range, including min and max.
 * @param {number} min
 * @param {number} max
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @desc Returns new array with chunks of size `chunkSize`
 * @param {number} chunkSize
 * @param {array} array
 */
export function arrayChunk(array, chunkSize) {
  return Array.from(new Array(Math.ceil(array.length / chunkSize)), (_, i) =>
    array.slice(i * chunkSize, i * chunkSize + chunkSize),
  );
}
