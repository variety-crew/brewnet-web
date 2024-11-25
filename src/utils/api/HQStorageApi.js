import BaseApiService from './BaseApiService';

export default class HQStorageApi extends BaseApiService {
  constructor() {
    super('/v1/hq/storage');
  }

  //
  // GET
  //

  // 창고 목록 조회
  getStorages({ page = 1, pageSize = 15, storageName = '', storageCode }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (storageName) {
      searchParams.append('storageName', storageName);
    } else if (storageCode) {
      searchParams.append('storageCode', storageCode);
    }

    return this.get(`?${searchParams.toString()}`);
  }

  // 창고명 리스트 조회
  getStoraeNames() {
    return this.get('/storages');
  }

  // 창고별 상품 및 재고 목록 조회
  getStock({ page = 1, pageSize = 15, storageCode = 1, itemName = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (storageCode) {
      searchParams.append('storageCode', storageCode);
    }

    if (itemName) {
      searchParams.append('itemName', itemName);
    }

    return this.get(`/storage-stock?${searchParams.toString()}`);
  }

  // 창고 상세 조회
  getStorage(storageCode) {
    return this.get(`/${storageCode}`);
  }
}
