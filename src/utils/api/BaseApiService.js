import { useUserStore } from '@/stores/user';

import DOMEvent from '../domEvent';

export default class BaseApiService {
  #baseUrl = 'http://localhost:8080/api';
  #resource;
  #userStore;

  constructor(resource) {
    if (!resource) throw new Error('Resource is not provided');
    this.#resource = resource;

    this.#userStore = useUserStore();
  }

  async #callApi(endpoint, fetchOptions) {
    try {
      const requestUrl = `${this.#baseUrl}${this.#resource}${endpoint}`;
      const requestHeaders = new Headers();

      // 토큰이 있다면 헤더에 담아 요청
      const token = this.#userStore.accessToken;
      if (token) {
        requestHeaders.append('Authorization', `${token}`);
      }

      // form data가 아니면 Content-Type 추가
      // -> Error: Multipart: Boundary not found 에러 대응
      if (fetchOptions?.body && !(fetchOptions.body instanceof FormData)) {
        requestHeaders.append('Content-Type', 'application/json');
      }

      // 요청 시작
      const response = await fetch(requestUrl, {
        ...fetchOptions,
        headers: requestHeaders,
      });
      if (response.ok) {
        // Promise resolved and HTTP status is successful

        // 응답 헤더에 토큰이 담겨져 왔다면 저장
        const newAccessToken = response.headers.get('authorization');
        if (newAccessToken) {
          this.#userStore.saveTempAccessToken(newAccessToken);
        }
        const newRefreshToken = response.headers.get('refresh-token');
        if (newRefreshToken) {
          this.#userStore.saveTempRefreshToken(newRefreshToken);
        }
        const responseData = await response.json();
        console.log(`${requestUrl} >>> 응답 >>>`, responseData); // response data logging

        return responseData.result;
      } else {
        // Promise resolved but HTTP status failed

        // 서버에서 보내주는 에러 메시지 뽑기
        const errorData = await response.json();
        const errMsg = errorData.message;

        throw new Error(errMsg);
      }
    } catch (error) {
      // Promise rejected

      DOMEvent.dispatchApiError(error.message);
      throw error; // throw 함으로써 사용부의 catch에 걸림
    }
  }

  async get(endpoint) {
    return this.#callApi(endpoint);
  }

  async post(endpoint, data) {
    let requestBody = JSON.stringify(data);
    if (data instanceof FormData) {
      requestBody = data; // formData는 stringify 처리 X
    }

    const fetchOptions = {
      method: 'POST',
      body: requestBody,
    };

    return this.#callApi(endpoint, fetchOptions);
  }

  async put(endpoint, data) {
    let requestBody = JSON.stringify(data);
    if (data instanceof FormData) {
      requestBody = data; // formData는 stringify 처리 X
    }

    const fetchOptions = {
      method: 'PUT',
      body: requestBody,
    };

    return this.#callApi(endpoint, fetchOptions);
  }

  async delete(endpoint) {
    const fetchOptions = {
      method: 'DELETE',
    };

    return this.#callApi(endpoint, fetchOptions);
  }
}
