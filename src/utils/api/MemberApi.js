import BaseApiService from './BaseApiService';

export default class MemberApi extends BaseApiService {
  constructor() {
    super('/v1/member');
  }

  //
  // GET
  //

  // 본사 직원목록 조회
  getMembers({ page = 0, pageSize = 15, memberName = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('pageSize', pageSize);
    if (memberName) {
      searchParams.append('search', memberName);
    }

    return this.get(`?${searchParams.toString()}`);
  }

  // 나의 정보 조회
  getMyInfo() {
    return this.get('/detail');
  }
}
