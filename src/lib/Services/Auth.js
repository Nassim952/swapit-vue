import Publisher from '../Connexion/Publisher'
// import { User } from './User';
class Auth extends Publisher {
  constructor() {
    super('https://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json',
      'Content-Type': 'application/merge-patch+json',
    });
    this.token = null;
  }
  async login(data) {
    const response = await this.post('login_check', data);
    response?.token ? localStorage.setItem('token', response.token) : this.token = null;
    return response;
  }

  async refresh(data) {
    const response = await this.post('login', data);
    return response;
  }

  disconnect() {
    this.token = null;
    localStorage.clear();
  }

  getToken() {
    return this.token;
  }
  
}

export { Auth };
