require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  dataUrl: 'https://api.github.com/repos/groupystinks/skrik-view/contents/data',
  firebaseUrl: 'https://fiery-torch-9452.firebaseio.com',
  app: {
    title: 'edtior',
    description: '',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'editor',
        'og:locale': 'zh-TW',
        'og:title': 'editor'
      }
    }
  }
}, environment);
