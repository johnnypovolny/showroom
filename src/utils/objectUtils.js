import * as R from 'ramda';

export const set = (key, value, obj) => R.assoc(key, value, obj);
