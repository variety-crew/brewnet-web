import BaseApiService from './BaseApiService';

export default class DocumentApi extends BaseApiService {
  constructor() {
    super('/v1/document');
  }

  //
  // GET
  //

  // 결재라인 조회
  getApproval() {
    return this.get('/approval');
  }
}
