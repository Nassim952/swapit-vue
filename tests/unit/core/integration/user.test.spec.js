import request from "supertest";
import httpStatus from "http-status-codes"
const baseurl =  "http://localhost:81/users";

it('should report error "User does not exist" when user does not exists', () => {
    return request(baseurl)
     .patch('/v1/users/palmeiras1914')
     //.set('Authorization', `Bearer ${adminAccessToken}`)
     .expect(httpStatus.NOT_FOUND)
     .then((res) => {
     expect(res.body.code).toBe.equal(404);
      expect(res.body.message).toBe.equal('User does not exist');
     });
   });