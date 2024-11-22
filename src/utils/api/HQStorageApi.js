import BaseApiService from './BaseApiService';

export default class HQStorageApi extends BaseApiService {
  constructor() {
    super('/v1/hq/storage');
  }

  //
  // GET
  //

  // 창고 목록 조회
  getStorages({ page = 1, pageSize = 15, storageName = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (storageName) {
      searchParams.append('storageName', storageName);
    }

    return this.get(`?${searchParams.toString()}`);
  }
}
