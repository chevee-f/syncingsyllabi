const APP_ENVIRONMENT = 'dev';

export const getAPIBaseUrl = () => {
  if (APP_ENVIRONMENT === 'dev') {
    return 'http://dev-syncingsyllabi-env-web-api.us-west-1.elasticbeanstalk.com/api/';
  }
}
