import {logger} from 'server/logger';
import {ValidationError} from 'server/errors';

export function errorHandler(err: Error, req: any, res: any, next: any) {
  if (err && err.message && err.message.toLowerCase() === 'validation error') {
    logger.warn(JSON.stringify(err));
    const response = formatValidationErrorResponse(err);
    return res.status(400).json(response);
  }

  logger.error(formatError(err));
  return res.status(500).json('Unhandled error');
}

function formatError(err): string {
  if (err instanceof Error) {
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  }
  return JSON.stringify(err);
}

function formatValidationErrorResponse(err) {
  if (err && err.name && err.name.toLowerCase().indexOf('sequelize') > -1) {
    return formatSequelizeError(err);
  }

  if (err && err.name.toLowerCase() === 'error') {
    return formatValidationError(err);
  }

  return err;
}

function formatSequelizeError(err) {
  const {name, errors} = err;
  const sequelizeError = Object.assign({}, {
    type: 'DataValidationError',
    locale: `validation.${errors[0].message.replace(new RegExp(' ', 'g'), '.')}`,
    name: err.name,
    errors: errors.map(({message, type, path}) => ({message, type, path})),
  });

  return sequelizeError;
}

function formatValidationError(err) {
  const {isValidationError, errors}  = err;

  if (isValidationError) {
    const error: ValidationError = err;
    const validationError = Object.assign({}, {
      isValidationError,
      type: 'ValidationError',
      locale: error.errorLocale,
      error: error.errorMessage,
    });

    return validationError;
  }

  if (errors && errors.length) {
    const validationError = Object.assign({}, {
      type: 'ValidationError',
      locale: `validation.${err.errors[0].types[0]}`,
      errors: errors.map(({field, messages, types}) => ({field, messages, types})),
    });

    return validationError;
  }

  return err;
}
