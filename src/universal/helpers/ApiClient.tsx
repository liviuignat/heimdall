import * as superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function getUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    const PORT = process.env.PORT || 4010;
    const HOST = process.env.HOST || 'localhost';
    return 'http://' + `${HOST}:${PORT}${adjustedPath}`;
  }
  return `${adjustedPath}`;
}

interface IRequestData {
  params?: any;
  data?: any;
}

interface IResponseData {
  body?: any;
  text?: any;
  status?: number;
}

export default class ApiClient {
  constructor(req = null, res = null) {
    methods.forEach((method) =>
      this[method] = (path, requestData: IRequestData = {}) => {
        const {params, data} = requestData;

        return new Promise((resolve, reject) => {
          const url = getUrl(path);
          const request = superagent[method](url);

          if (params) {
            request.query(params);
          }

          if (__SERVER__) {
            copyHeadersToRequest({request, headers: req.headers});
          }

          request.set('Content-Type', 'application/json');
          request.set('Accept', 'application/json, text/javascript');

          if (data) {
            request.send(data);
          }
          request.end((err, response: IResponseData = {}) => {
            const {body, text} = response;

            if (err) {
              return reject(body || err);
            }

            resolve(body || text);
          });
        });
      });
  }
}

function copyHeadersToRequest({request, headers}) {
  Object.keys(headers || {}).forEach(key => request.set(key, headers[key]));
}
