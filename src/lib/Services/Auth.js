import Publisher from '../Connexion/Publisher'
class Auth extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json'
    });
    this.token = null;
  }
  async login(data) {
    const response = await this.post('login_check', {auth: data});
    this.token = response.token;
    return response;
  }

  async refresh(data) {
    const response = await this.post('login', {auth: data});
    return response;
  }

  disconnect() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }
  
}

export { Auth };
