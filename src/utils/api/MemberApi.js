import dayjs from 'dayjs';

import BaseApiService from './BaseApiService';

export default class MemberApi extends BaseApiService {
  constructor() {
    super('/v1/member');
  }

  //
  // GET
  //

  // 본사 직원목록 조회
  getMembers({ page = 0, pageSize = 15, memberName = '' }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('pageSize', pageSize);
    if (memberName) {
      searchParams.append('search', memberName);
    }

    return this.get(`?${searchParams.toString()}`);
  }

  // 나의 정보 조회
  getMyInfo() {
    return this.get('/detail');
  }

  // 나의 결재목록 조회(내가 결재자인 경우)
  getMyApprovals({
    page = 0,
    startDate = dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    endDate = dayjs().format('YYYY-MM-DD'),
    approval,
    dateSort,
  }) {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page);
    searchParams.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
    searchParams.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));

    if (approval) {
      searchParams.append('approval', approval);
    }

    if (dateSort) {
      searchParams.append('dateSort', dateSort);
    }

    return this.get(`/my-approval?${searchParams.toString()}`);
  }
}
