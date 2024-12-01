import BaseApiService from './BaseApiService';

export default class CategoryApi extends BaseApiService {
  constructor() {
    super('/v1/category');
  }

  //
  // GET
  //

  // 하위 카테고리 목록 조회 (상위 카테고리 정보 포함)
  getCategories() {
    return this.get('');
  }

  // 상위 카테고리 목록 조회
  getSuperCategories() {
    return this.get('/super');
  }

  //
  // POST
  //

  // 카테고리 생성
  createCategory(superCategoryCode, categoryName) {
    return this.post('', {
      superCategoryCode,
      categoryName,
    });
  }
}
