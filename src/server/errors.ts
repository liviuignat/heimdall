export class ValidationError extends Error {
  public isValidationError = true;
  public type = 'ValidationError';
  public errorMessage = '';
  public errorLocale = '';

  constructor(message: string, errorLocale: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = 'validation error';
    this.errorMessage = message;
    this.errorLocale = errorLocale;
  }
}
