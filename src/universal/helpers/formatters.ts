export function errorFomatter(error): string {
  if (error && error.locale) {
    return error.locale;
  }
  return error;
}
