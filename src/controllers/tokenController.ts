import {Request, Response, NextFunction} from 'express';
import * as validate from 'validate';
import {
  getAccessToken,
  getAuthClientById,
  deleteAccessToken,
  deleteRefreshToken,
} from 'repositories';
import {logger} from 'logger';

export async function getTokenInfo(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const tokenValue: string = req.query.access_token;
    await validate.tokenForHttp(tokenValue);

    const accessToken = await getAccessToken(tokenValue);
    await validate.tokenExistsForHttp(accessToken);

    const authClient = await getAuthClientById(accessToken.clientId);
    await validate.clientExistsForHttp(authClient);

    const expirationLeft = Math.floor((accessToken.expirationDate.getTime() - Date.now()) / 1000);
    return res.json({
      audience : authClient.id,
      scope: accessToken.scope,
      user_id: accessToken.userId,
      expires_in : expirationLeft,
    });
  } catch (err) {
    logger.warn(JSON.stringify(err));
    return res.status(400).json({error: 'invalid_token'});
  }
}

export async function revokeToken(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
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
