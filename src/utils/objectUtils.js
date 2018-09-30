import * as R from 'ramda';

export const set = (key, value, obj) => R.assoc(key, value, obj);

export const merge = (obj1, obj2) => R.merge(obj1, obj2);

