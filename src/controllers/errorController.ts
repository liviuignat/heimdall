import {logger} from 'logger';

export function errorHandler(err: Error, req: any, res: any, next: any) {
  if (err && err.message && err.message.toLowerCase() === 'validation error') {
    logger.warn(JSON.stringify(err));
    const response = formatValidationErrorResponse(err);
    return res.status(400).json(response);
  }

  logger.error(JSON.stringify(err));
  return res.status(500).json('Unhandled error');
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
    locale: `validation.${errors[0].message.replace(' ', '.')}`,
    name: err.name,
    errors: errors.map(({message, type, path}) => ({message, type, path})),
  });

  return sequelizeError;
}

function formatValidationError(err) {
  const {errors}  = err;
  const validationError = Object.assign({}, {
    type: 'ValidationError',
    locale: `validation.${err.errors[0].types[0]}`,
    errors: errors.map(({field, messages, types}) => ({field, messages, types})),
  });

  return validationError;
}
