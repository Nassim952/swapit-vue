import request from "supertest";
import httpStatus from "http-status-codes"
const baseurl =  "https://localhost:81/users";

it('should report error "User does not exist" when user does not exists', () => {
    return request(baseurl)
     .patch('/v1/users/palmeiras1914')
     //.set('Authorization', `Bearer ${adminAccessToken}`)
     .expect(httpStatus.NOT_FOUND)
     .then((res) => {
      expect(res.body.code).to.be.equal(404);
      expect(res.body.message).to.be.equal('User does not exist');
     });
   });