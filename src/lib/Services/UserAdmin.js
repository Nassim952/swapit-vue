import Publisher from '../Connexion/Publisher'
import { AuthAdmin } from './AuthAdmin';
import VueSimpleAlert from "vue-simple-alert";
class UserAdmin extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + 'var env token Admin'
    });
    this.authAdmin = new AuthAdmin();
  }

  async getUser(id, properties = null) {
    const response = await this.get(this.formatEndPoint('users', id, properties));
    return response;
  }

  async postUser(data) {
    this.getUsers(null, null, { 'email': data.email }).then(response => {
      response = response.shift();
      if (response === undefined) {
        this.post(this.formatEndPoint('users'), data);
        VueSimpleAlert.fire({
          title: 'Utilisateur créé',
          text: 'Vous pouvez maintenant vous connecter',
          type: 'success',
          timer: 3000
        }).then(() => {
          window.location.href = "/signin"
        })
      }
      else {
        VueSimpleAlert.fire({ 
          title: 'Email déjà utilisé', 
          text: 'Veuillez en choisir un autre', 
          type: 'warning', 
        })
      }
    }).catch(() => {
      VueSimpleAlert.fire({ 
        title: 'Erreur', 
        text: 'Veuillez réessayer', 
        type: 'error', 
      })
    })
  }

  async patchUser(id, data) {
    const response = await this.patch(this.formatEndPoint('users', id), data);
    return response;
  }

  async delUser(id) {
    const response = await this.delete(this.formatEndPoint('users', id));
    return response;
  }

  async getUsers(ids = null, properties = null, filters = null) {
    const response = await this.get(this.formatEndPoint('users', ids, properties, filters));
    return response;
  }

  async getReceivedExchanges(id) {
    const response = await this.get(`${'users'}/${id}/received_exchanges`, {});
    return response;
  }

  async getSendExchanges(id) {
    const response = await this.get(`${'users'}/${id}/send_exchanges`, {});
    return response;
  }
}

export { UserAdmin };
