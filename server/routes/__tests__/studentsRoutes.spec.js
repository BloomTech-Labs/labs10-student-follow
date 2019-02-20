const request = require('supertest');
const server = require('../../api/server.js');

describe('students routes', () => {
  describe('get all students', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/students');
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
});
