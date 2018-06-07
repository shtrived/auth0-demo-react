export const EMPTY_ARRAY = Object.freeze([]);

export const SORT_DIRECTION = Object.freeze({
  ASC: 'ascending',
  DESC: 'descending'
});

export const INITIAL_STATE = Object.freeze({
  error: undefined,
  isFetching: false,
  items: EMPTY_ARRAY,
  sortColumn: 'name',
  sortDirection: SORT_DIRECTION.ASC
});
