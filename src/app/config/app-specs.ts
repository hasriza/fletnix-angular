import { environment } from '../../environments/environment';

/* eslint-disable no-unused-vars */

export const AppDefaults = {
  APP_NAME: 'FletNix',
  APP_DESCRIPTION: 'Filter and Search for no charge at all!',

  APP_VERSION: '0.0.1',
  APP_BUILD: '1',
};

export const V1_APIS = environment.DOMAIN + '/v1';

export const AUTH_APIS = V1_APIS + '/auth';
