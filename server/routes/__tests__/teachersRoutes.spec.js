const request = require('supertest');
const server = require('../../api/server.js');

describe('server.js', () => {
  describe('teachers routes', () => {
    describe('GET all teachers', () => {
      it('should return 200', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get('/teachers');
        expect(response.status).toEqual(expectedStatusCode);
      });
    });
    describe('GET single teacher', () => {
      it('should return 200', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get('/teachers');
        expect(response.status).toEqual(expectedStatusCode);
      });
      it('should return a correctly shaped teachers object', async () => {
        const expectedShape = expect.objectContaining({
          classes: expect.any(Array),
          id: expect.any(Number),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String)
        });
        const response = await request(server).get('/teachers/1');
        expect(response.body).toEqual(expectedShape);
      });
    });
    describe('PUT teacher', () => {
      it('should return 200', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get('/teachers');
        expect(response.status).toEqual(expectedStatusCode);
      });
      it('should update a teacher', async () => {
        const body = {
          firstname: 'joe',
          lastname: 'schmoe'
        };
        const response = await request(server)
          .put('/teachers/1')
          .send(body);
        expect(response.body).toEqual({ updatedRecords: 1 });
      });
    });
    describe('DELETE teacher', () => {
      it('should delete a teacher', async () => {
        const response = await request(server).delete('/teachers/499');
        expect(response.body).toEqual({ deletedRecords: 1 });
      });
    });
  });
});
