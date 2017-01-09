import * as request from 'superagent';
import * as config from 'config';
import * as nodemailer from 'nodemailer';
import {logger} from 'logger';

interface IEmailConfig {
  email: string;
  from: string;
  password: string;
};

const TEMPLATE_SERVICE_API_KEY = 'a64329437e2a45178bf58e8cbf3c4daa';
const TEMPLATE_SERVICE_PROJECT_ID = '58715d55be537a2800834de3';
const EMAIL_CONFIG = config.get<IEmailConfig>('notification');

export async function sendNewRegisteredUserEmail(user: IUser) {
  try {
    const template = await getTemplate('58715d78be537a2800834de6', user);
    const sentEmailInfo = await sendEmail(user.email, 'EverReal - New account created', template);
    logger.info(`NewRegisteredUserEmail: ${JSON.stringify(sentEmailInfo)}`);
  } catch (err) {
    logger.error(`Error sending NewRegisteredUserEmail: ${JSON.stringify(err)}`);
    throw err;
  }
}

export async function sendUserResetPasswordEmail(user: IUser, newPassword: string) {
  try {
    const template = await getTemplate('58715d82be537a2800834de8', {
      newPassword,
    });
    const sentEmailInfo = await sendEmail(user.email, 'EverReal - Reset pssword', template);
    logger.info(`UserResetPasswordEmail: ${JSON.stringify(sentEmailInfo)}`);
  } catch (err) {
    logger.error(`Error sending UserResetPasswordEmail: ${JSON.stringify(err)}`);
    throw err;
  }
}

export async function getTemplate(templateId: string, json: any): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    request
      .post(`http://www.maildoodle.com/api/projects/${TEMPLATE_SERVICE_PROJECT_ID}/templates/${templateId}/generate`)
      .set('content-type', 'application/json')
      .set('x-api-token', TEMPLATE_SERVICE_API_KEY)
      .send({json})
      .end((err, response) => {
        if (err) {
          return reject(err);
        }
        return resolve(response.text || response.body);
      });
  });
}

export async function sendEmail(to: string, subject: string, html: string): Promise<Object> {
  const {email, password, from} = EMAIL_CONFIG;
  const transporter = nodemailer.createTransport(`smtps://${encodeURIComponent(email)}:${password}@smtp.gmail.com`);
  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      return resolve(info);
    });
  });
}
