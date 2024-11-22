import BaseApiService from './BaseApiService';

export default class DocumentApi extends BaseApiService {
  constructor() {
    super('/v1/document');
  }

  //
  // GET
  //

  // 결재라인 조회
  getApprovalLines() {
    return this.get('/approval');
  }

  //
  // POST
  //
}
