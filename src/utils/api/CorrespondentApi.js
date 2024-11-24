import { SEARCH_CRITERIA } from '../constant';
import BaseApiService from './BaseApiService';

export default class CorrespondentApi extends BaseApiService {
  constructor() {
    super('/v1/hq/correspondent');
  }

  //
  // GET
  //

  // 거래처 목록 조회
  getCorrespondents({ page = 1, pageSize = 15, searchType, keyword }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);

    if (searchType === SEARCH_CRITERIA.CORRESPONDENT_CODE) {
      searchParams.append('correspondentCode', keyword);
    } else if (searchType === SEARCH_CRITERIA.CORRESPONDENT_NAME) {
      searchParams.append('correspondentName', keyword);
    }

    return this.get(`?${searchParams.toString()}`);
  }

  // 거래처의 취급 품목 목록 조회
  getCorrespondentItems({ page = 1, pageSize = 15, correspondentCode, searchType, keyword }) {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', page);
    searchParams.append('pageSize', pageSize);
    searchParams.append('correspondentCode', correspondentCode);

    if (searchType === SEARCH_CRITERIA.ITEM_UNIQUE_CODE) {
      searchParams.append('itemUniqueCode', keyword);
    } else if (searchType === SEARCH_CRITERIA.ITEM_NAME) {
      searchParams.append('itemName', keyword);
    }

    return this.get(`/items?${searchParams.toString()}`);
  }
}
