import Publisher from '../Connexion/Publisher'
class Notification extends Publisher {
  constructor() {
    super('https://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
  }

  async patchNotification(id, data) {
    const response = await this.patch(this.formatEndPoint('notifications',id),data);
    return response;
  }

  async delNotification(id) {
    const response = await this.delete(this.formatEndPoint('notifications',id));
    return response;
  }
}

export {Notification};
