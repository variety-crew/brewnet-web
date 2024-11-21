import { useUserStore } from '@/stores/user';

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
        requestHeaders.append('Authorization', `Bearer ${token}`);
      }

      // form data가 아니면 Content-Type 추가
      // -> Error: Multipart: Boundary not found 에러 대응
      if (fetchOptions?.body && !(fetchOptions.body instanceof FormData)) {
        requestHeaders.append('Content-Type', 'application/json');
      }

      // 만들어진 헤더 셋팅
      fetchOptions['headers'] = requestHeaders;

      // 요청 시작
      const response = await fetch(requestUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      // 응답 헤더에 토큰이 담겨져 왔다면 저장
      const newAccessToken = response.headers.get('authorization');
      if (newAccessToken) {
        this.#userStore.saveAccessToken(newAccessToken);
      }
      const newRefreshToken = response.headers.get('refresh-token');
      if (newRefreshToken) {
        this.#userStore.saveRefreshToken(newRefreshToken);
      }

      return response.json();
    } catch (e) {
      return null;
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
