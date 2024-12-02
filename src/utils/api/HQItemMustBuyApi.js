import BaseApiService from './BaseApiService';

export default class HQItemMustBuyApi extends BaseApiService {
  constructor() {
    super('/v1/hq/items/must-buy');
  }

  //
  // GET
  //

  // 필수 구매 품목 조회
  getMustBuyItems() {
    return this.get('');
  }

  //
  // POST
  //

  // 필수 구매 품목 지정
  setMustBuy({ itemCode, quantity, dueDate }) {
    return this.post(`/set/${itemCode}`, { quantity, dueDate });
  }

  //
  // PATCH
  //

  // 필수 구매 품목 수정
  editMustBuy({ itemCode, quantity, dueDate }) {
    return this.patch(`/update/${itemCode}`, { quantity, dueDate });
  }
}
