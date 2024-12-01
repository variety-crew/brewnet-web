import BaseApiService from './BaseApiService';

export default class HQItemApi extends BaseApiService {
  constructor() {
    super('/v1/hq/item');
  }

  //
  // GET
  //

  // 상품 목록 조회 (본사용)
  getItems({ page = 0, pageSize = 15, itemUniqueCode, itemName }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (itemUniqueCode) {
      searchParams.append('itemCode', itemUniqueCode);
    }

    if (itemName) {
      searchParams.append('itemName', itemName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
