import axios from 'axios'

class Publisher {
    constructor (url, headers) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 8000,
            headers: headers
        })
    }

    post = async function(url,data) {
        var response = await this.instance.post(url, data).then(response => { return response.data }).catch(error => { console.log(error) })
        return response
    }

    patch = async function(url,data) {
        var response = await this.instance.patch(url, data).then(response => {  return response.data }).catch(error => { console.log(error) })
    
        return response
    }

    get = async function(url) {
        var response = await this.instance.get(url).then(response => {  return response.data }).catch(error => { console.log(error) })
        return response
    }

    delete = async function(url) {
        var response = await this.instance.delete(url).then(response => { return response }).catch(error => { console.log(error) }) 
        return response
    }

    formatEndPoint(entity, ids, properties, filters) {
        var endpoint = []
    
        properties ? endpoint.push(this.formatProperties(properties)): null;
        filters ? endpoint.push(this.formatFilters(filters)): null;
        if(ids) {
            Array.isArray(ids) ? endpoint.push(this.formatUrlIds(ids)): null;
        }

        return `https://swapit-vue.herokuapp.com/${entity}${Array.isArray(ids) ? '.json':'' }${ids && !Array.isArray(ids) ? '/' + ids : ''}${ids && Array.isArray(ids)||properties||filters?'/?':''}${endpoint? endpoint.join('&'):''}`
    }

    formatUrlIds(ids) {
        return  Array.isArray(ids) ? `${ids ? ids.map(id => `ids[]=${id}`).join('&'):''}`: ids; 
    }

    formatProperties(properties) {
        return Array.isArray(properties) ? `${properties ? 'properties[]='+ properties.map(prop => { return prop}).join('&properties[]='):''}`: ''; 
    }

    formatFilters(filters) {
        var filters_temp = []

        for (const [key, filter] of Object.entries(filters)) {
            if(filter) {
                if(!Array.isArray(filter)) {
                    filters_temp.push (key !== 'default' ? `${key}=${filter}` : filter)
                } else {
                    for (const value of Object.values(filter))
                    filters_temp.push ( `${key}[]=${value}`)
                }
            }
        }
        return filters_temp ? filters_temp.join('&'):''
    }
}

export default Publisher;