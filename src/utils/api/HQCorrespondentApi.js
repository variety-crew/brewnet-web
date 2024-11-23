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

  // 특정 거래처가 취급하는 품목 조회
  getCorrespondentItems({ page = 1, pageSize = 15, correspondentCode, itemUniqueCode, itemName }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);
    searchParams.append('correspondentCode', correspondentCode);

    if (itemUniqueCode) {
      searchParams.append('itemUniqueCode', itemUniqueCode);
    }

    if (itemName) {
      searchParams.append('itemName', itemName);
    }

    return this.get(`/items?${searchParams.toString()}`);
  }
}