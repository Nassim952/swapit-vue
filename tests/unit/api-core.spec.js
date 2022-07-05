import request from "supertest";

const baseurl =  "http://localhost:81/users?page=1";
describe ('testing api core status code and content type', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('1')
        .trustLocalhost()
        .expect("Content-Type", /json/)
        expect (response.statusCode).toBe(200)
        
    });
})


describe("Testing post api ", () => {
    test("POST /send user", async (done) => {
      const response = await request(baseurl)
        .post("/users")
        .expect("Content-Type", /json/)
        .send({
            username: "Francisque",
            lastname: "corona",
            email: "francisco@example.com",
            role: ["ROLE_USER"],
            receivedExchanges: ["string exemple"],
            sendxchange: ["string exemple"],
            ownGames: ["fifa"],
            wishGames: ["GTA 6"],
        })
        expect (response.statusCode).toBe(200)
    });
  });
