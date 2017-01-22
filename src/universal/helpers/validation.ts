/**
 * Maps validation message keys to an Intl value
 * Used to return language specific localization messages to be used in redux-form components
 */
export function mapValidationMessagesToLocale(intl, validations = []) {
  const {formatMessage} = intl;
  return validations.map((validation) => (value, formData) => {
    const response = validation(value, formData) || {};
    const id = response.key;
    return id ? formatMessage({id}) : '';
  });
}
