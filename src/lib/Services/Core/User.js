import Publisher from '../Connexion/Publisher'
class User extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json'
    });
    this.apiKey = 'b0f9b9c9d3e0e9f7f7f0b8c8c7d';
    this.baseUrl = 'https://localhost:81/';
    this.headers = {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'user-key': this.apiKey
    };
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
    console.log('patch' ,data)
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

  async getExchange(id,properties = null) {
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

  async getOwnGames(id) {
    const response = await this.get(this.formatEndPoint('users',id));
    return response ? response.ownGames: response;
  }

  async getWishGames(id) {
    const response = await this.get(this.formatEndPoint('users',id));
    return response ? response.wishGames: response;
  }
}

export { User };
