import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class HQReturnApi extends BaseApiService {
    constructor() {
        super('/v1/hq/return');
    }

    //
    // GET
    //

    // 반품요청 목록 조회
    getReturnList({ page = 0, pageSize = 15 }) {
        const searchParams = new URLSearchParams();
        searchParams.append('page', page);
        searchParams.append('size', pageSize);

        return this.get(`?${searchParams.toString()}`);
    }

  // 전체 교환 목록 (엑셀 다운로드용)
  getAllExchangeList({
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    criteria,
    keyword,
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (criteria && keyword) {
      searchParams.append('searchFilter', criteria);
      searchParams.append('searchWord', keyword);
    }

    return this.get(`/excel-data?${searchParams.toString()}`);
  }
}
