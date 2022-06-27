import Publisher from '../Connexion/Publisher'
class Igdb extends Publisher {
  constructor() {
    super('https://api.igdb.com/v4/', {
      'Accept': 'application/json'
    });
    this.apiKey = 'b0f9b9c9d3e0e9f7f7f0b8c8c7d';
    this.baseUrl = 'https://api.igdb.com/v4/';
    this.headers = {
      'Accept': 'application/json',
      'user-key': this.apiKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }

  async getGame(id, properties = null) {
    const data = await this.get(this.formatEndPoint('games',id, properties));
    return data;
  }

  async getGameCovers(id, properties = null) {
    const data = await this.get(this.formatEndPoint('covers',id, properties));
    return data;
  }

  async getGames(ids = null, properties = null) {
    const data = await this.get(this.formatEndPoint('games',ids, properties));
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
    // console.log(filters)
    // var filterTemp = [];
    // if('name' in filters) {
    //   filterTemp.name = filters.name
    // }
    // console.log(filterTemp)
    // filterTemp.default = 'popular';
    if(filters) {
      if(!('default' in filters)) {
        filters.default = 'popular';
      }
    }
    
    console.log(filters)
    const data = await this.get(this.formatEndPoint('games',ids, properties, filters));
    return data;
  }
}

export { Igdb };
