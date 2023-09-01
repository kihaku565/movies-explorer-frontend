import { API_URL } from './constants';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Метод для обработки результата запроса
  async _requestResult(res) {
    const { ok } = res;
    const result = await res.json();
    return ok ? result : Promise.reject(res);
  }

  // Получение списка фильмов
  async getMovies() {
    try {
      const res = await fetch(this._baseUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return this._requestResult(res);
    } catch (error) {
      // Обработка ошибки здесь
      throw error;
    }
  }
}

const moviesApi = new MoviesApi({
  baseUrl: API_URL.MOVIES_URL,
});

export default moviesApi;
