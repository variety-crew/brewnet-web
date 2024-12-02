import BaseApiService from './BaseApiService';

export default class FCReturnApi extends BaseApiService {
  constructor() {
    super('/v1/franchise/return');
  }

  //
  // GET
  //

  // 반품신청 목록 조회
  getReturnList({ page = 0, pageSize = 15 }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', pageSize);

    return this.get(`?${searchParams.toString()}`);
  }
}
