import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class FCExchangeApi extends BaseApiService {
  constructor() {
    super('/v1/franchise/exchange');
  }

  //
  // GET
  //

  // 교환목록 조회/검색
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
      searchParams.append('criteria', criteria);
      searchParams.append('searchWord', keyword);
    }
    return this.get(`/search?${searchParams.toString()}`);
  }

  getAvailableOrders() {
    return this.get(`/available-orders`);
  }

  getAvailableItems({ orderCode }) {
    return this.get(`/available-items/${orderCode}`);
  }

  // 교환 상세조회 설정
  getExchangeDetail(exchangeCode) {
    return this.get(`/${exchangeCode}`);
  }

  //
  // POST
  //

  // 가맹점의 교환요청 등록
  createExchange({ orderCode, exchangeItemList = [], reason, explanation, sumPrice, images }) {
    // FormData 객체 생성
    const formData = new FormData();

    exchangeItemList.forEach(file => {
      formData.append('exchangeImageList', file);
    });

    // JSON 데이터를 문자열로 변환하여 FormData에 추가
    const exchangeReqVO = {
      orderCode,
      exchangeItemList,
      reason,
      explanation,
      sumPrice,
    };

    formData.append('exchangeReqVO', this.makeBlobJson(exchangeReqVO));
    // formData의 내용 출력
    formData.forEach((value, key) => {
      console.log(`*** ${key}:`, value);
    });

    return this.post('/', formData);
  }
}
