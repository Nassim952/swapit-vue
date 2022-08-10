import Publisher from '../Connexion/Publisher'
class Channel extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
  }

  async getChannel(id, properties = null) {
    const response = await this.get(this.formatEndPoint('channels',id, properties));
    return response;
  }

  async postChannel(data) {
    const response = await this.post('channels',data);
    return response;
  }

  async patchChannel(id, data) {
    const response = await this.patch(this.formatEndPoint('channels',id),data);
    return response;
  }

  async delChannel(id) {
    const response = await this.delete(this.formatEndPoint('channels',id));
    return response;
  }

  async getChannels(ids = null, properties = null) {
    const response = await this.get(this.formatEndPoint('channels',ids, properties));
    return response;
  }

  async postMessage(data) {
    const response = await this.post('messages',data);
    return response;
  }
}

export {Channel};
