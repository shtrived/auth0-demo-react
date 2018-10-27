import _ from 'lodash';
import axios from 'axios';

import authorizationService from './AuthorizationService';

class WebApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_AUTH0_API_ENDPOINT,
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
