import {Request, Response, NextFunction} from 'express';
import * as validate from 'server/validate';
import {
  getAccessToken,
  getAuthClientById,
  deleteAccessToken,
  deleteRefreshToken,
} from 'server/repositories';
import {logger} from 'server/logger';

export async function getTokenInfoAction(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const tokenValue: string = req.query.access_token;

    const tokenInfo = await getTokenInfo(tokenValue);

    return res.json(tokenInfo);
  } catch (err) {
    logger.warn(JSON.stringify(err));
    return res.status(400).json({error: 'invalid_token'});
  }
}

export async function revokeTokenAction(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const tokenValue: string = req.query.token;
    await validate.tokenForHttp(tokenValue);

    await deleteAccessToken(tokenValue);
    await deleteRefreshToken(tokenValue);

    return res.json({});
  } catch (err) {
    logger.warn(JSON.stringify(err));
    return res.status(400).json({error: 'invalid_token'});
  }
}

export async function getTokenInfo(tokenValue: string): Promise<any> {
  await validate.tokenForHttp(tokenValue);

  const accessToken = await getAccessToken(tokenValue);
  await validate.tokenExistsForHttp(accessToken);

  const authClient = await getAuthClientById(accessToken.clientId);
  await validate.clientExistsForHttp(authClient);

  const expirationLeft = Math.floor((accessToken.expirationDate.getTime() - Date.now()) / 1000);

  return {
    audience : authClient.id,
    scope: accessToken.scope,
    user_id: accessToken.userId,
    expires_in : expirationLeft,
  };
}
