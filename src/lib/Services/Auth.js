import Publisher from '../Connexion/Publisher'
// import { User } from './User';
class Auth extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    this.token = null;
  }
  async login(data) {
    const response = await this.post('login_check', data);
    if(response?.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('email', data.email)
    }
    return response;
  }

  async refresh(data) {
    const response = await this.post('login', data);
    return response;
  }

  async me() {
    if (localStorage.getItem('email')) {
      const response = await this.get(this.formatEndPoint('users',null, null, {'email': localStorage.getItem('email')}));
      if(response) {
        var data = response
        data = data.shift()
        console.log('data', data)
        data?.password ? delete data.password : null;
        console.log('data', data)
        return data;
      }
    }
    return false;
  }

  disconnect() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token') ?? null;
  }
  
}

export { Auth };
