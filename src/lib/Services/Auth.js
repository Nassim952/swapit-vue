import Publisher from '../Connexion/Publisher'
import jwt_decode from 'jwt-decode'
import VueSimpleAlert from 'vue-simple-alert'
class Auth extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
  }
  async login(data) {
    const response = await this.post('login_check', data);
    if (response?.token) {
      var decoded = jwt_decode(response.token);
      console.log(decoded);
      if (decoded.mail_confirmed == true ||decoded.mail_confirmed == null) {
        localStorage.setItem('token', response.token);

        this.token = response.token;
        this.id = decoded.id;
        this.roles = decoded.roles;

        return response;
      }
      else {
        VueSimpleAlert.fire({
          title: 'Email non confirmé',
          text: 'Veuillez confirmer votre email avant de vous connecter !',
          type: 'warning',
        })
        return false;
      }
    }
    else {
      return false;
    }
  }

  async refresh(data) {
    const response = await this.post('login', data);
    return response;
  }

  async me(properties = ['id', 'email', 'roles', 'username', 'ownGames', 'wishGames', 'receivedExchanges', 'sendExchanges']) {

    if (this.getId()) {
      const response = await this.get(this.formatEndPoint('users', this.getId(), properties));
      return response;
    }
    return false;
  }

  disconnect() {
    localStorage.clear();
  }

  getId() {
    if (localStorage.getItem('token')) {
      var decoded = jwt_decode(localStorage.getItem('token'));
      return decoded.id;
    }
    return null;
  }

  getRoles() {
    if (localStorage.getItem('token')) {
      var decoded = jwt_decode(localStorage.getItem('token'));
      return decoded.roles;
    }
    return null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

}

export { Auth };
