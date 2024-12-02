import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class HQExchangeApi extends BaseApiService {
  constructor() {
    super('/v1/hq/exchange');
  }

  //
  // GET
  //

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

  // 교환목록 조회
  getExchanges({
    page = 1,
    size = 15,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    criteria,
    keyword,
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', size);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (criteria && keyword) {
      searchParams.append('searchFilter', criteria);
      searchParams.append('searchWord', keyword);
    }

    return this.get(`${searchParams.toString()}`);
  }

  // 교환목록 검색
  searchExchanges({
    page = 0,
    size = 15,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    criteria,
    keyword,
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', size);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (criteria && keyword) {
      searchParams.append('searchFilter', criteria);
      searchParams.append('searchWord', keyword);
    }

    return this.get(`/search?${searchParams.toString()}`);
  }

  // 교환 상세조회
  getExchangeDetail(exchangeCode) {
    return this.get(`/${exchangeCode}`);
  }

  // 교환 결재이력 조회
  getExchangeApprovalLines(exchangeCode) {
    return this.get(`/approver/${exchangeCode}`);
  }

  // 타부서 교환처리내역 목록 조회/검색
  searchOtherExchanges({
    page = 0,
    size = 15,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    criteria,
    keyword,
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', size);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (criteria && keyword) {
      searchParams.append('searchFilter', criteria);
      searchParams.append('searchWord', keyword);
    }

    return this.get(`/other?${searchParams.toString()}`);
  }

  //
  // POST
  //

  // 책임자의 결재 승인/반려
  managerApprove({ exchangeCode, approval, comment }) {
    return this.post(`/${exchangeCode}/manager-approve`, { approval, comment });
  }
}
