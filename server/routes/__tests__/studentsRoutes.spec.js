const request = require('supertest');
const server = require('../../api/server.js');

describe('students routes', () => {
  describe('GET all students', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/students');
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
  describe('GET single student', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/students/1');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should return a correctly shaped student object', async () => {
      const expectedShape = expect.objectContaining({
        id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
        email: expect.any(String),
        classes: expect.any(Array)
      });
      const response = await request(server).get('/students/1');
      expect(response.body).toEqual(expectedShape);
    });
  });
  describe('POST student', () => {
    it('should add a student', async () => {
      const student = {
        firstname: 'justin',
        lastname: 'lowry',
        email: 'justin@mail.com'
      };
      const response = await request(server)
        .post('/students')
        .send(student);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ newStudentID: expect.any(Number) });
    });
  });
  describe('PUT student', () => {
    it('should return a 200', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/students');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should update a student', async () => {
      const body = {
        firstname: 'joe',
        lastname: 'schmoe'
      };
      const response = await request(server)
        .put('/students/1')
        .send(body);
      expect(response.body).toEqual({ updatedRecords: 1 });
    });
  });
  describe('DELETE student', () => {
    it('should delete a student', async () => {
      const response = await request(server).delete('/students/500');
      expect(response.body).toEqual({ deletedRecords: 1 });
    });
  });
});
