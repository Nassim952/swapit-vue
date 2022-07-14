import Publisher from '../Connexion/Publisher'

class UserAdmin extends Publisher {
  constructor() {
    super('http://localhost:81/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.VUE_APP_ADMIN_JWT
    });
  }

  async getUsers(ids = null, properties = null, filters = null) {
    const response = await this.get(this.formatEndPoint('users', ids, properties, filters));
    return response;
  }

}

export { UserAdmin };
