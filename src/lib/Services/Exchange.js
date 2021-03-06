import Publisher from '../Connexion/Publisher'
class Exchange extends Publisher {
  constructor() {
    super('https://prod-api-core.herokuapp.com/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') ?? 'null'
    });
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

  async validExchanges(id = null) {
    const response = await this.patch(`${'exchanges'}/${id}/accept`,{});
    return response;
  }

  async refuseExchanges(id = null)  {
    const response = await this.patch(`${'exchanges'}/${id}/refuse`,{});
    return response;
  }
}

export {Exchange};
