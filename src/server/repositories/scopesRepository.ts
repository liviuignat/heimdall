const union = require('lodash/union');
const intersection = require('lodash/intersection');

const commonScopes = [
  'offline_access',
];

const superAdminScopes = [
  'superadmin_all',
];

const companyAdminScopes = [
  'company_users_read',
  'company_users_write',
];

const userScopes = [
  'something_read',
  'something_write',
];

const allScopes = [
  ...commonScopes,
  ...superAdminScopes,
  ...companyAdminScopes,
  ...userScopes,
];

export async function getAllScopes(): Promise<string[]> {
  return allScopes;
}

export async function getScopesByUserId(userId: string, scopes: string[] = []): Promise<string[]> {
  // TODO: This will return the scopes the user has access to, which will be stored in the database
  // For convenience now we return all scopes.
  const currentUserScopes = allScopes;

  // If the user request contains any common scopes, add them to the user allowed scopes
  const totalUserAllowedScopes = union(currentUserScopes, intersection(commonScopes, scopes));

  if (scopes.includes('*')) {
    return totalUserAllowedScopes;
  }

  return intersection(totalUserAllowedScopes, scopes);
}
