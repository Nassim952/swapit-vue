import Publisher from '../Connexion/Publisher'
import { Auth } from './Auth';
class User extends Publisher {
  constructor() {
    super('http://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Auth.getToken ?? 'null'
    });
  }

  async getUser(id, properties = null) {
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

  async getUsers(ids = null, properties = null) {
    const response = await this.get(this.formatEndPoint('users',ids, properties));
    return response;
  }
}

export { User };
