import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class HQOrderApi extends BaseApiService {
  constructor() {
    super('/v1/hq/orders/list');
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
    // correspondentName = '',
    franchiseName = '',
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('size', size);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (orderCode) {
      searchParams.append('orderCode', orderCode);
    }

    if (managerName) {
      searchParams.append('managerName', managerName);
    }

    // if (correspondentName) {
    //   searchParams.append('correspondentName', correspondentName);
    // }

    if (franchiseName) {
      searchParams.append('franchiseName', franchiseName);
    }

    return this.get(`?${searchParams.toString()}`);
  }

  // 주문 상세 조회 설정 (진행중 / s완료X)
  getOrderDetail({ positionName, kind, seq }) {
    const requestBody = {
      positionName,
      kind,
      seq,
    };
    return this.post('/approver', requestBody);
  }
}
