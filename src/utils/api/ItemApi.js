import BaseApiService from './BaseApiService';

export default class ItemApi extends BaseApiService {
  constructor() {
    super('/v1/item');
  }

  //
  // GET
  //

  // 상품 목록 조회 (주문 시)
  getItems({ page = 0, pageSize = 15, itemUniqueCode, itemName }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (itemUniqueCode) {
      searchParams.append('itemUniqueCode', itemUniqueCode);
    }

    if (itemName) {
      searchParams.append('itemName', itemName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
