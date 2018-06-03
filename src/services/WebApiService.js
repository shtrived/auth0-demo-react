import _ from 'lodash';
import axios from 'axios';

import authorizationService from './AuthorizationService';

import { AUTH_CONFIG } from './auth-variables';

class WebApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: AUTH_CONFIG.apiUrl,
      headers: {
        Authorization: 'Bearer ' + authorizationService.getAccessToken()
      }
    });
  }

  getClients(fields) {
    return this.axios.get('/api/clients', {
      params: {
        fields: _.join(fields, ',')
      }
    });
  }
}

export default WebApiService;
