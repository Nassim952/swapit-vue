import Publisher from '../Connexion/Publisher'
class User extends Publisher {
  constructor() {
    super('http://swapit-api-core.herokuapp.com/', {
      'Accept': 'application/json'
    });
    this.apiKey = 'b0f9b9c9d3e0e9f7f7f0b8c8c7d';
    this.baseUrl = 'https://swapit-api-core.herokuapp.com/';
    this.headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'user-key': this.apiKey
    };
  }

  async getExchange(id, properties = null) {
    const response = await this.get(this.formatEndPoint('exchanges',id, properties));
    return response;
  }

  async postExchange(data) {
    const response = await this.post('exchanges',data);
    return response;
    
  }

  async patchExchange(id, data) {
    console.log('patch' ,data)
    const response = await this.patch(this.formatEndPoint('exchanges',id),data);
    return response;
  }

  async delExchange(id) {
    const response = await this.delete(this.formatEndPoint('exchanges',id));
    return response;
  }

  async getexchanges(ids = null, properties = null) {
    const response = await this.get(this.formatEndPoint('exchanges',ids, properties));
    return response;
  }

  async getExchange(id, properties = null) {
    const response = await this.get(this.formatEndPoint('exchanges',id, properties));
    return response;
  }

  async addExchange(id, data) {
    const response = await this.post(this.formatEndPoint('exchanges',id),data);
    return response;
  }

  async patchExchange(id, data) {
    const response = await this.patch(this.formatEndPoint('exchanges',id),data);
    return response;
  }

  async delExchange(id) {
    const response = await this.delete(this.formatEndPoint('exchanges',id));
    return response;
  }

  async getExchanges(ids = null, properties = null) {
    const response = await this.get(this.formatEndPoint('exchanges',ids, properties));
    return response;
  }
}

export { User };
