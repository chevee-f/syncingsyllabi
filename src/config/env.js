const APP_ENVIRONMENT = 'dev';

export const getAPIBaseUrl = () => {
  if (APP_ENVIRONMENT === 'dev') {
    return 'http://dev-syncingsyllabi-env-web-api.us-west-1.elasticbeanstalk.com/api/';
  }
}

export const getWebClientId = (platform) => {
  if (platform === 'ios') {
    return '974860535646-b0a3m3q99jks7vnkooljnir4mqcs9aam.apps.googleusercontent.com';
  }else{
    return '974860535646-l9bj1lpd6708f4v1i004gua11orcq2nf.apps.googleusercontent.com'
  }
}