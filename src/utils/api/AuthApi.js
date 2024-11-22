import BaseApiService from './BaseApiService';

export default class AuthApi extends BaseApiService {
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

  logout() {
    return this.post('/logout');
  }
}
