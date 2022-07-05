import request from "supertest";
const baseurl =  "https://localhost/api/games.json?page=1&id=";
describe ('testing api', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
    });
})