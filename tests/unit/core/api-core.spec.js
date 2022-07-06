import request from "supertest";

const baseurl =  "http://localhost:81";
describe ('testing api core status code and content type', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/users')
        trustLocalhost()
        .expect("Content-Type", /json/)
        expect (response.statusCode).toBe(200)
        
    });
})

describe("Testing post api ", () => {
    test("POST /send user", async (done) => {
      const response = await request(baseurl)
        .post("/users")
        .set('Content-type', 'json')
        .send({
            username: "Test",
            password: "usertesting",
            email: "tester@test.com",
            roles: [
                "ROLE_USER"
            ]
        })
        expect (response.statusCode).toBe(201)
    });
  });
