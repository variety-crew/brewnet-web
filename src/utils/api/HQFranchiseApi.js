import BaseApiService from './BaseApiService';

export default class HQFranchiseApi extends BaseApiService {
  constructor() {
    super('/v1/hq/franchise');
  }

  getFranchiseMembers({ page = 0, pageSize = 15, franchiseName = '', city = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('pageSize', pageSize);

    if (franchiseName) {
      searchParams.append('franchiseName', franchiseName);
    }

    if (city) {
      searchParams.append('citys', city);
    }

    return this.get(`/member?${searchParams.toString()}`);
  }
}
