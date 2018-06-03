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

  getMessage() {
    return this.axios.get('/api/message');
  }

  getUsers() {
    return this.axios.get('/api/users');
  }
}

export default WebApiService;
