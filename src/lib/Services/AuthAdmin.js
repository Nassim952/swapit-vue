import Publisher from '../Connexion/Publisher'

class AuthAdmin extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  }

  async login(data) {
    const response = await this.post('login_check', data);
    if (response?.token) {
      // seter la var env avec le token
      //  = response.token;
      return response;
    }
    else {
      return false;
    }
  }

  async refresh(data) {
    const response = await this.post('login', data);
    return response;
  }

}

export { AuthAdmin };
