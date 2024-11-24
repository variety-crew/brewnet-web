// 주문 내역 조회 - 임시
import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class FCOrderQueryApi extends BaseApiService {
  constructor() {
    super('/v1/franchise/orders');
  }

  //
  // GET
  //

  // 주문목록 조회
  getOrders({
    page = 1,
    size = 15,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    orderCode = null,
    managerName = '',
    franchiseName = '',
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', size);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (orderCode) {
      searchParams.append('orderCode', orderCode);
    }

    if (managerName) {
      searchParams.append('managerName', managerName);
    }

    if (franchiseName) {
      searchParams.append('franchiseName', franchiseName);
    }

    return this.get(`/list?${searchParams.toString()}`);
  }

  //   // 주문 상세 조회 설정
  getOrderDetail(orderCode) {
    return this.get(`/detail/${orderCode}`);
  }

  //   // 주문 결재이력 조회
  //   getOrderApprovalLines(orderCode) {
  //     return this.get(`/detail/${orderCode}/history/approval`);
  //   }
}
