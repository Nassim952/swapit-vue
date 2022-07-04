import Publisher from '../Connexion/Publisher'
class Igdb extends Publisher {
  constructor() {
    super('https://swapit-api-game.herokuapp.com/api/', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  }

  async getGame(id, properties = null) {
    const data = await this.get(this.formatEndPoint('games',id, properties));
    return data;
  }

  async getGames(ids = null, properties = null,  filters = null) {
    const data = await this.get(this.formatEndPoint('games',ids, properties, filters));
    return data;
  }

  async getGenre(id, properties = null) {
    const data = await this.get(this.formatEndPoint('genres',id, properties));
    return data;
  }

  async getGenres(ids = null, properties = null) {
    const data =  await this.get(this.formatEndPoint('genres',ids, properties));
    return data;
  }

    async getPlatform(id , properties = null) {
      const data = await this.get(this.formatEndPoint('platforms',id, properties));
      return data;
  }

    async getPlatforms(ids = null, properties= null) {
      const data =  await this.get(this.formatEndPoint('platforms',ids, properties));
      return data;
  }

  async getMode(id, properties= null) {
    const data =  await this.get(this.formatEndPoint('modes',id, properties));
    return data;
  }

  async getModes(ids = null, properties= null) {
    const data =  await this.get(this.formatEndPoint('modes',ids, properties));
    return data;
  }

  async getPopulars(ids = null, properties = null, filters = null) {
    if(filters) {
      if(!('default' in filters)) {
        filters.default = 'popular';
      }
      console.log(filters)
    }
    const data = await this.get(this.formatEndPoint('games',ids, properties, filters));
    return data;
  }
}

export { Igdb };
