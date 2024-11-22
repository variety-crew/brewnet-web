import BaseApiService from './BaseApiService';

export default class MemberApi extends BaseApiService {
  constructor() {
    super('/v1/member');
  }

  getMembers({ page = 0, pageSize = 15, memberName = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('pageSize', pageSize);
    if (memberName) {
      searchParams.append('search', memberName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
