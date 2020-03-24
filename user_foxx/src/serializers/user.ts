const buildNext = (fields: { [key: string]: string | number }) =>
  `/users?${Object.keys(fields)
    .filter((field: string): boolean => field !== 'count' && !!fields[field])
    .map((field: string): string => `${field}=${fields[field]}`)
    .join('&')}`;

export default {
  id: '_key',
  blacklist: ['_key', '_id', '_rev'],
  topLevelMeta: (_data: ArangoDB.Document[], { limit, count }) => ({
    count,
    hasMore: count >= limit,
  }),
  topLevelLinks: (
    _data: ArangoDB.Document[],
    fields: { [key: string]: string | number },
  ) => ({
    next: buildNext(fields),
  }),
};
