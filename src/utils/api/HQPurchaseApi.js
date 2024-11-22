import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class HQPurchaseApi extends BaseApiService {
  constructor() {
    super('/v1/hq/purchase');
  }

  //
  // GET
  //

  // 발주목록 조회
  getPurchases({
    page = 1,
    pageSize = 15,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    purchaseCode = null,
    memberName = '',
    correspondentName = '',
    storageName = '',
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('pageSize', pageSize);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (purchaseCode) {
      searchParams.append('purchaseCode', purchaseCode);
    }

    if (memberName) {
      searchParams.append('memberName', memberName);
    }

    if (correspondentName) {
      searchParams.append('correspondentName', correspondentName);
    }

    if (storageName) {
      searchParams.append('storageName', storageName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
