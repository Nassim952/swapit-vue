import Publisher from '../Connexion/Publisher'
import { Auth } from './Auth';
import VueSimpleAlert from 'vue-simple-alert';
class User extends Publisher {
  constructor() {
    super('https://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
    this.auth = new Auth();
  }

  async getUser(id, properties = null) {
    const response = await this.get(this.formatEndPoint('users', id, properties));
    return response;
  }

  async postUser(data) {
    this.post(this.formatEndPoint('users'), data).then(response => {
      if(response){
        VueSimpleAlert.fire({
          title: 'Utilisateur créé',
          text: 'Vous pouvez maintenant vous connecter',
          type: 'success',
          timer: 3000
        }).then(() => {
          window.location.href = "/signin";
        })
      }
      else{
        VueSimpleAlert.fire({
          title: 'Erreur lors de la création de l\'utilisateur',
          text: 'Le mail est peut-être déjà utilisé',
          type: 'error',
        })
      }
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

export { User };
