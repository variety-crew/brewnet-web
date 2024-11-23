import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class FCOrderApi extends BaseApiService {
  constructor() {
    super('/v1/franchise/orders');
  }

  //
  // POST
  //

  // 가맹점의 주문 등록
  createOrder({ items }) {
    return this.post({
      items,
    });
  }

  //
  // GET
  //
}
