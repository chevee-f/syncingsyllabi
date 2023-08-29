const APP_ENVIRONMENT = 'dev';

export const getAPIBaseUrl = () => {
  if (APP_ENVIRONMENT === 'dev') {
    return 'http://dev-api-syncingsyllabi.us-west-1.elasticbeanstalk.com/api/';
  }
}

export const getWebClientId = (platform) => {
  if (platform === 'ios') {
    return '824174854315-j6mc0r92fg09mur2ct10aq34ogblhjof.apps.googleusercontent.com';
  }else{
    return '824174854315-28mh9lr14k19mcfea7icoc67dncefkqe.apps.googleusercontent.com';
  }
}