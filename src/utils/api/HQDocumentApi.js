import BaseApiService from './BaseApiService';

export default class HQDocumentApi extends BaseApiService {
  constructor() {
    super('/v1/hq/document');
  }

  //
  // GET
  //

  // 결재라인 조회
  getApprovalLines() {
    return this.get('/approval');
  }
}
