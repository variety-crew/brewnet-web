import BaseApiService from './BaseApiService';

export default class AuthApiService extends BaseApiService {
  constructor() {
    super('/v1/auth');
  }

  getAuth() {
    return this.get('');
  }

  login(loginId, password) {
    return this.post('/login', {
      loginId,
      password,
    });
  }
}
