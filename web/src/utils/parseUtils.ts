import { filter, sort, capitalizeCase, isNull } from './utils';

/* eslint-disable no-continue */
/**
 * get values from parseObject
 * @param {Parse.Object} parseObject
 * @param {Array|Set} names
 * @param [dest]
 */
export function getValues(parseObject: any, names: string[], dest: any = {}) {
  if (parseObject == null) {
    // makes it work with redux-form initialValues
    return null;
  }
  names.forEach(name => {
    const value = parseObject.get(name);
    if (value != null) {
      dest[name] = value;
    }
  });
  return dest;
}

export const setValue = (parseObject: any, name: string, value: any): void => {
  const oldValue = parseObject.get(name);
  if (isNull(value)) {
    parseObject.unset(name);
  } else if (oldValue !== value) {
    parseObject.set(name, value);
  }
};

/**
 * . null or undefined values aren't set
 * . a value is set only when it's different
 * @param parseObject
 * @param values
 * @param {Array|Set} names (optional), ensures we only set the right properties
 */
export const setValues = (parseObject: any, values: any, names: any[]): void => {
  if (names) {
    values = filter(values, names);
  }
  for (const key in values) {
    if (!values.hasOwnProperty(key)) {
      continue;
    }
    const value = values[key];
    setValue(parseObject, key, value);
  }
};

export const equals = (obj1: any, obj2: any): boolean => {
  if (obj1 == null) {
    return obj2 == null;
  }
  if (obj2 == null) {
    return false;
  }
  return obj1.id === obj2.id;
};

// -------------------------------------------------------------------------//
// ------------------------------ User utils -------------------------------//
// -------------------------------------------------------------------------//
export function getFirstName(user: any) {
  if (!user) return null;
  const firstName = user.get('firstName') || '';
  return capitalizeCase(firstName);
}
export function getLastName(user: any) {
  if (!user) return null;
  const lastName = user.get('lastName') || '';
  return lastName.toUpperCase();
}
export const getUserName = (user: any) => {
  if (!user) return '';
  return `${getFirstName(user)  } ${  getLastName(user)}`;
};
export function getFullName(user: any) {
  if (!user) return null;
  return `${getFirstName(user)  } ${  getLastName(user)}`;
}
export function getInverseFullName(user: any) {
  if (!user) return null;
  return `${getLastName(user)  } ${  getFirstName(user)}`;
}

// -------------------------------------------------------------------------//
// -------------------------------- sorting --------------------------------//
// -------------------------------------------------------------------------//
// --------------------------------//
// ------------ orders ------------//
// --------------------------------//
const orderSortKeySupplier = (order: any) => {
  const plan = order.get('date');
  const user = plan ? plan.get('user') : null;
  return user ? getFullName(user)?.toLowerCase() : order.id.toLowerCase();
};
export function sortOrders(array: any[]) {
  sort(array, orderSortKeySupplier);
}

export function toId(parseObjOrId: any) {
  if (!parseObjOrId) {
    return null;
  }
  if (typeof parseObjOrId === 'string') {
    return parseObjOrId;
  }
  return parseObjOrId.id;
}

/**
 * compares by id
 * @param parseObjects
 * @param searchedParseObject
 * @returns {boolean}
 */
export function includes(parseObjects: any[], searchedParseObject: any) {
  if (!parseObjects || !searchedParseObject) {
    return false;
  }
  const searchedId = searchedParseObject.id;
  return !!parseObjects.find((obj: any) => obj.id === searchedId);
}

/**
 * @param {Array} parseObjects
 * @param {Array} excludedObjects
 * @return {Array} a filtered copy
 */
export function exclude(parseObjects: any[], excludedObjects: any) {
  const excludedIds = new Set();
  excludedObjects.forEach((excludedObject: any) => excludedIds.add(excludedObject.id));
  return parseObjects.filter((parseObject: any) => !excludedIds.has(parseObject.id));
}

/**
 * get distinct of objects
 * @param {Array<Parse.Object>} parseObjects
 * @param {string} [key], it can be 'username', 'name', 'date'
 * @returns {Array}
 */
export function setDistinctObjects(parseObjects: any[], key = 'id') {
  if (!parseObjects) return [];
  const array: any[] = [];
  parseObjects.forEach((parseObj: any) => {
    if (!array.find(item => item[key] === parseObj[key])) {
      array.push(parseObj);
    }
  });
  return array;
}

export const USE_BATCH_SIZE = { batchSize: 1000 };
export const USE_READ_PREFERENCE = { readPreference: 'SECONDARY' };