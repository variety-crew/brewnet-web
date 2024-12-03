import BaseApiService from './BaseApiService';

export default class FCReturnApi extends BaseApiService {
  constructor() {
    super('/v1/franchise/return');
  }

  //
  // GET
  //

  // 반품신청 목록 조회
  getReturnList({ page = 0, pageSize = 15 }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('size', pageSize);

    return this.get(`?${searchParams.toString()}`);
  }

  // 반품신청 가능한 주문 목록 조회
  getAvailableReturnList() {
    return this.get('/available-orders');
  }

  // 반품할 품목 조회
  getAvailableOrderItemsList(orderCode) {
    return this.get(`/available-items/${orderCode}`);
  }

  //
  // POST
  //

  // 반품신청
  createReturn({ orderCode, returningItemCodeList, reason, explanation, sumPrice, imageFiles }) {
    const formData = new FormData();
    const dto = {
      orderCode,
      returningItemList: returningItemCodeList.map(e => ({ itemCode: e })),
      reason,
      explanation,
      sumPrice,
    };
    formData.append('returningReqVO', this.makeBlobJson(dto));

    imageFiles.forEach(imageFile => {
      formData.append('returningImage', imageFile);
    });

    return this.post('/', formData);
  }
}
