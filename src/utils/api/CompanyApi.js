import BaseApiService from './BaseApiService';

export default class CompanyApi extends BaseApiService {
  constructor() {
    super('/v1/company');
  }

  //
  // GET
  //

  // 회사 정보 조회
  getCompanyInfo() {
    return this.get('');
  }
}
