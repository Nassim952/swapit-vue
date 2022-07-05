import request from "supertest";
const baseurl =  "https://localhost/api/games.json?page=1&id=";
describe ('testing api games status code and content type', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('1')
        .trustLocalhost()
        .expect("Content-Type", /json/)
        expect (response.statusCode).toBe(200)
        
    });
})
