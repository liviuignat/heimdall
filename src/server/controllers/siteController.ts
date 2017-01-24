import {Request, Response} from 'express';
import * as config from 'config';

const loggedInRedirectUrl = config.get<string>('loggedInRedirectUrl');

export async function getHome(req: Request, res: Response): Promise<void | Response> {
  if (req.user) {
    return res.redirect(loggedInRedirectUrl);
  }
  return res.redirect('/login');
}

export async function getLocalizedTranslationScript(req: Request, res: Response): Promise<void | Response> {
  const {language} = req.params;
  const messages = (req as any).getTranslation({language});
  const locale = {language, messages};
  const script = `window.__locale = ${JSON.stringify(locale)}`;
  res.send(script);
}
