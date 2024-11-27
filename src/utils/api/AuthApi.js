import BaseApiService from './BaseApiService';

export default class AuthApi extends BaseApiService {
  constructor() {
    super('/v1/auth');
  }

  //
  // GET
  //

  // 나의 권한 조회
  getAuth() {
    return this.get('');
  }

  //
  // POST
  //

  // 로그인
  login(loginId, password) {
    return this.post('/login', {
      loginId,
      password,
    });
  }

  // 로그아웃
  logout() {
    return this.post('/logout');
  }

  // 계정 생성
  createMember({ id, password, name, email, contact, positionName, franchiseCode }) {
    return this.post('/sign-up', {
      id,
      password,
      name,
      email,
      contact,
      positionName,
      franchiseCode,
    });
  }
}
