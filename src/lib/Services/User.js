import Publisher from '../Connexion/Publisher'
import { Auth } from './Auth';
class User extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
    this.auth = new Auth();
  }

  async getUser(id, properties = null)  {
    const response = await this.get(this.formatEndPoint('users',id, properties));
    return response;
  }

  async postUser(data) {
    const response = await this.post('users',data);
    return response; 
  }

  async patchUser(id, data) {
    const response = await this.patch(this.formatEndPoint('users',id),data);
    return response;
  }

  async delUser(id) {
    const response = await this.delete(this.formatEndPoint('users',id));
    return response;
  }

  async getUsers(ids = null, properties = null, filters = null) {
    const response = await this.get(this.formatEndPoint('users',ids, properties, filters));
    return response;
  }

  async getReceivedExchanges(id) {
    const response = await this.get(`${'users'}/${id}/received_exchanges`,{});
    return response;
  }

  async getSendExchanges(id) {
    const response = await this.get(`${'users'}/${id}/send_exchanges`,{});
    return response;
  }
}

export { User };
