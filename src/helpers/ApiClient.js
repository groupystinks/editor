import superagent from 'superagent';
import Firebase from 'firebase';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

function formatGithubUrl(path, options) {
  const isCompleteURL = options ? options.isCompleteURL : false;
  if (!isCompleteURL) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    return config.dataUrl + adjustedPath;
  }

  return path;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, options } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path, options));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

class _GithubApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data, options } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatGithubUrl(path, options));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body, text } = {}) => {
          // response is either body or text(for github raw file) part.
          // text part should be removed when api change to firebase.
          const response = body ? body : text;
          return err ? reject(body || err) : resolve(response);
        });
      }));
  }
}

class _FirebaseApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (children, {data} = {}) => new Promise((resolve, reject) => {
        const ref = new Firebase(`${config.firebaseUrl}/${children}`);
        switch (method) {
          case 'get':
            ref.on('value', (snapshot) => {
              resolve(snapshot.val());
            }, (error) => {
              reject(error.code);
            });
            break;
          case 'post':
            ref.set(data);
            break;
          default:
            return true;
        }
      }));
  }
}

const ApiClient = _ApiClient;
const GithubApiClient = _GithubApiClient;
const FirebaseApiClient = _FirebaseApiClient;

export {
  ApiClient,
  FirebaseApiClient,
  GithubApiClient
};
