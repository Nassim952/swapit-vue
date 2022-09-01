import Publisher from '../Connexion/Publisher'
import { Auth } from './Auth';
import { UserAdmin } from './UserAdmin';
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
    const response = await this.post(this.formatEndPoint('users'), data);
    const provider = new UserAdmin();
    provider.sendMailConfirmation(response.id);
    return response;
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
    const response = await this.get(`users/${id}/received_exchanges`, {});
    return response;
  }

  async getSendExchanges(id) {
    const response = await this.get(`users/${id}/send_exchanges`, {});
    return response;
  }

  async sendMailContact(id) {
    const response = await this.patch(`users/${id}/send-mail-for-contact`, {})
    return response;
  }

  async getChannels(id) {
    const response = await this.get(`users/${id}/channels`, {});
    return response;
  }

  async getNotifications(id) {
    const response = await this.get(`users/${id}/notifications`, {});
    return response;
  }

  async getChannelNotification(idChannel) {
    const response = await this.get(`channels/${idChannel}/channel-notification`, {});
    return response;
  }

  async delNotification(id) {
    // const response = await this.delete(this.formatEndPoint('notifications', id));
    // return response;
    return id;
  }
}

export { User };
