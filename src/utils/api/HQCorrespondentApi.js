import BaseApiService from './BaseApiService';

export default class HQCorrespondentApi extends BaseApiService {
  constructor() {
    super('/v1/hq/correspondent');
  }

  //
  // GET
  //

  // 거래처 목록 조회
  getCorrespondent({ page = 1, pageSize = 15, correspondentCode, correspondentName }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (correspondentCode) {
      searchParams.append('correspondentCode', correspondentCode);
    }

    if (correspondentName) {
      searchParams.append('correspondentName', correspondentName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
