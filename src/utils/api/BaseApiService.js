export default class BaseApiService {
  #BASE_URL = 'http://localhost:8080';

  async #callApi(url, fetchOptions) {
    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return response.json();
    } catch (e) {
      return null;
    }
  }

  async get(endpoint) {
    return this.#callApi(`${this.#BASE_URL}${endpoint}`);
  }

  async post(endpoint, data) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this.#callApi(`${this.#BASE_URL}${endpoint}`, fetchOptions);
  }

  async put(endpoint, data) {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this.#callApi(`${this.#BASE_URL}${endpoint}`, fetchOptions);
  }

  async delete(endpoint) {
    const fetchOptions = {
      method: 'DELETE',
    };
    return this.#callApi(`${this.#BASE_URL}${endpoint}`, fetchOptions);
  }
}
