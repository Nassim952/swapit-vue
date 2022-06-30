import Publisher from '../Connexion/Publisher'
class Auth extends Publisher {
  constructor() {
    super('https://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json'
    });
    this.apiKey = 'b0f9b9c9d3e0e9f7f7f0b8c8c7d';
    this.baseUrl = 'https://swapit-api-core.herokuapp.com/';
    this.headers = {
      'Accept': 'application/json',
      'user-key': this.apiKey
    };
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
  
}

export { Auth };
