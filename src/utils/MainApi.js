import { API_URL, API_ENDPOINTS } from './constants';

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = this._getHeaders();
  }

  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(result.message);
  }

  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    };
  }

  async _fetchWithHeaders(url, options) {
    const response = await fetch(url, {
      ...options,
      headers: this._headers,
    });
    return this._requestResult(response);
  }

  // Регистрация нового пользователя
  async createUser(name, email, password) {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.SIGN_UP}`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return response;
  }

  // Вход пользователя
  async login(email, password) {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.SIGN_IN}`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response && response.token) {
      // Обновляем заголовки с новым токеном
      this._headers.authorization = `Bearer ${response.token}`;
      // Сохраняем токен в localStorage
      localStorage.setItem('jwt', response.token);
    }

    return response;
  }

  // Получение информации о текущем пользователе
  async getUserInfo() {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.USER_PROFILE}`, {
      method: 'GET',
    });
    return response;
  }

  // Обновление данных пользователя
  async updateUser(name, email) {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.USER_PROFILE}`, {
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
    return response;
  }

  // Получение сохраненных фильмов пользователя
  async getSavedMovies() {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.MOVIES}`, {
      method: 'GET',
    });
    return response;
  }

  // Добавление нового фильма
  async addNewMovie(data) {
    const response = await this._fetchWithHeaders(`${this._baseUrl}${API_ENDPOINTS.MOVIES}`, {
      method: 'POST',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
    return response;
  }

  // Удаление фильма
  async deleteMovie(data) {
    const response = await this._fetchWithHeaders(
      `${this._baseUrl}${API_ENDPOINTS.MOVIES}/${data}`,
      {
        method: 'DELETE',
      }
    );
    return response;
  }
}

const mainApi = new MainApi({
  baseUrl: API_URL.BASE_URL,
});

export default mainApi;
