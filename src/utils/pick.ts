/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
interface AnyObject {
  [key: string]: any;
}

const pick = (object: AnyObject, keys: string[]): AnyObject => {
  return keys.reduce((obj: AnyObject, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
