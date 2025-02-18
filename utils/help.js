// JS对象深度合并
const deepClone = require('./deepClone')
export function deepMerge(target = {}, source = {}) {
  // console.log(deepClone.default.deepClone)
  target = deepClone.default.deepClone(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}