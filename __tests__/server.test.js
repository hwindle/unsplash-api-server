// import the file to be tested
const server = require('../server');
// supertest is a HTTP tester that works alongside jest 
const supertest = require('supertest');
const mockRequest = supertest(server.app);

describe('Unsplash API server', () => {
  // async/await for network requests, or database
  // requests that may take some time
  it('/ Home route', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toEqual(200);
    console.log(response.text);
    expect(response.text).toEqual('Home route');
  });
  // bad route - 404
  it('/bad incorrect route (404)', async () => {
    const response = await mockRequest.get('/bad');
    expect(response.status).toEqual(404);
  });

  // bad method - post (not implemented on this app)
  it('/ incorrect method (post)', async () => {
    const response = await mockRequest.post('/unimplemented');
    expect(response.status).toEqual(404);
  });

  // randomImage object 
  it('/randomImage is an object', async () => {
    const response = await mockRequest.get('/randomImage');
    expect(response.status).toEqual(200);
    console.log(typeof response.body);
    expect(typeof response.body).toEqual('object');
  });

  // searchImage route with no get parameter, http code 500
  it('/searchImage?title= returns 500', async () => {
    const getParams = {};
    const response = await mockRequest.get('/searchImage').query(getParams);
    expect(response.status).toBe(500);
  });

  // searchImage with title of 2 characters gives http 200
  it('search of only 2 characters returns 200', async () => {
    const getParams = { title: 'ab' };
    const response = await mockRequest.get('/searchImage').query(getParams);
    expect(response.status).toBe(200);
  });

  // searchImage with title of 16 characters gives http 200
  it('search of 16 characters or more returns 200', async () => {
    const getParams = { title: 'asdfgshklqpwerwe' };
    const response = await mockRequest.get('/searchImage').query(getParams);
    expect(response.status).toBe(200);
  });

  // searchImage returns 200 with correct length get parameter
  it('/searchImage?title=rainbow returns an object', async () => {
    const getParams = { title: 'rainbow' };
    const response = await mockRequest.get('/searchImage').query(getParams);
    expect(response.status).toBe(200);
    console.log(typeof response.body);
    expect(typeof response.body).toEqual('object');
  });

});
