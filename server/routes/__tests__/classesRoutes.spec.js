const request = require('supertest');
const server = require('../../api/server.js');

describe('classes routes', () => {
  describe('GET all classes', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/classes');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should return a list of classes', async () => {
      const response = await request(server).get('/classes');
      expect(response.body).toContainEqual({ id: 55, name: 'copying' });
    });
  });
  describe('GET single class', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/classes/1');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should return a correctly shaped classes object', async () => {
      // not sure why this one's failing
      const expectedShape = expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        refreshrs: expect.any(Array),
        students: expect.any(Array),
        teacher: expect.any(String)
      });
      const response = await request(server).get('/classes/1');
      expect(response.body).toEqual(expectedShape);
    });
  });
  describe('POST class', () => {
    it('should add a new class', async () => {
      const body = {
        name: 'herding cats'
      };
      const response = await request(server)
        .post('/classes')
        .send(body);
      expect(response.body).toEqual({ newClassID: expect.any(Number) });
    });
  });
  describe('PUT class', () => {
    it('should return 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/classes');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should update a class', async () => {
      const body = {
        name: 'some new class'
      };
      const response = await request(server)
        .put('/classes/1')
        .send(body);
      expect(response.body).toEqual({ updatedRecords: 1 });
    });
  });
  describe('DELETE class', () => {
    it('should delete a student', async () => {
      const response = await request(server).delete('/classes/500');
      expect(response.body).toEqual({ deletedRecords: 1 });
    });
  });
});
