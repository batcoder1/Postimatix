import nock from 'nock';
import { Api } from './Api';
import { expect } from 'chai';

describe('Api', () => {
  let api: Api;

  beforeEach(() => {
    api = new Api();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should make a GET request to the specified url and return the data', async () => {
    // Arrange
    const url = 'https://my-api.com/users';
    const data = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    nock('https://my-api.com').get('/users').reply(200, data);

    // Act
    const response = await api.get<typeof data>(url);

    // Assert
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal(data);
  });

  it('should send a patch request and return the data', async () => {
    const data = { key: 'value' };
    const expectedData = { success: true };
    nock('https://myapi.com').patch('/endpoint', data).reply(200, expectedData);

    const response = await api.patch('https://myapi.com/endpoint', data);
    expect(response.data).to.deep.equal(expectedData);
  });
  it('should send a post request and return the data', async () => {
    const data = { key: 'value' };
    const expectedData = { success: true };
    nock('https://myapi.com').post('/endpoint', data).reply(200, expectedData);

    const response = await api.post('https://myapi.com/endpoint', data);
    expect(response.data).to.deep.equal(expectedData);
  });

  it('should send a post request and return the data', async () => {
    const expectedData = { success: true };
    nock('https://myapi.com').delete('/endpoint').reply(200, expectedData);

    const response = await api.delete('https://myapi.com/endpoint');
    expect(response.data).to.deep.equal(expectedData);
  });

  it('should send a put request and return the data', async () => {
    const data = { key: 'value' };
    const expectedData = { success: true };
    nock('https://myapi.com').put('/endpoint', data).reply(200, expectedData);

    const response = await api.put('https://myapi.com/endpoint', data);
    expect(response.data).to.deep.equal(expectedData);
  });
});
