import { db } from '@arangodb';

/**
 * @param options - pagination limit and offset
 * @param fields - user attributes
 */
export function findUsers(
  { limit = 10, offset = 0 },
  {
    region,
    address,
    lastName,
    birthDay,
    firstName,
    community,
    birthYear,
    birthMonth,
  }: { [key: string]: string | number },
): ArangoDB.Document[] {
  const birthDayFilter = birthDay ? `FILTER user.birth_day == ${birthDay}` : '';

  const birthYearFilter = birthYear
    ? `FILTER user.birth_year == ${birthYear}`
    : '';

  const birthMonthFilter = birthMonth
    ? `FILTER user.birth_month == ${birthMonth}`
    : '';

  const query = `
  FOR user IN UserView
  ${firstName ? `FILTER LIKE(user.first_name, "${firstName}\%", true)` : ''}
  ${lastName ? `FILTER LIKE(user.last_name, "${lastName}\%", true)` : ''}
    ${region ? `FILTER LIKE(user.region, "\%${region}\%", true)` : ''}
    ${address ? `FILTER LIKE(user.address, "\%${address}\%", true)` : ''}
    ${community ? `FILTER LIKE(user.community, "\%${community}\%", true)` : ''}

    ${birthDayFilter}
    ${birthYearFilter}
    ${birthMonthFilter}
    LIMIT ${offset}, ${limit}
    RETURN user
  `;

  const result = db._query(query).toArray();

  return result;
}
