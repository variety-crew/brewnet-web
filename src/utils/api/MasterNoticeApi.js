import BaseApiService from './BaseApiService';

export default class MasterNoticeApi extends BaseApiService {
  constructor() {
    super('/v1/master/notice');
  }

  //
  // POST
  //

  // 공지사항 등록
  createNotice({ title, content, imageFiles = [] }) {
    const formData = new FormData();
    const createNoticeRequestDTO = {
      title,
      content,
    };
    formData.append('createNoticeRequestDTO', createNoticeRequestDTO);
    formData.append('image', imageFiles);

    return this.post('', formData);
  }

  //
  // PUT
  //

  // 공지사항 수정
  editNotice({ noticeCode, title, content, imageFiles }) {
    const formData = new FormData();
    const updateNoticeRequestDTO = {
      noticeCode,
      title,
      content,
    };
    formData.append('updateNoticeRequestDTO', updateNoticeRequestDTO);
    formData.append('image', imageFiles);

    return this.put('', formData);
  }

  //
  // DELETE
  //

  // 공지사항 삭제
  deleteNotice(noticeCode) {
    return this.delete('', { noticeCode });
  }
}
