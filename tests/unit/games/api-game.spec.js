import request from "supertest";
const baseurl =  "https://localhost/api";



/* // COMPANY
describe ('Fetching api route : company', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/companies')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})
describe ('Fetching api route : /companies/{id}', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/companies/1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})

//  GAMES
describe ('Fetching api route : /api/games', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
}) */

describe ('Fetching api route : /api/games/{id}', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games/1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})


describe ('Fetching api route : games/{id}/involved_companies', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games/1/involved_companies')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})

describe ('Fetching api route : /api/games/{id}/modes', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games/1/modes')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})


describe ('Fetching api route : /api/games/{id}/platforms', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games/1/platforms')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})

describe ('Fetching api route : /games/{id}/genres', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/games/1/genres')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})




// GENRE
describe ('Fetching api route : Genre', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/genres')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})

/* describe ('Fetching api route : /api/genres/{id}', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/genres/1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
}) */

// MODES
describe ('Fetching api route : /api/modes', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/modes')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})
describe ('Fetching api route : /api/modes/{id}', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/modes/1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})

//PLATFORM

describe ('Fetching api route : platforms', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/platforms')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
})
/* describe ('Fetching api route : platforms/{id}', () =>{
    it ('should return 200 status code',async ()=>{
        const response = await request(baseurl).get('/platforms/1')
        .trustLocalhost()
        expect (response.statusCode).toBe(200)
        
    });
}) */

