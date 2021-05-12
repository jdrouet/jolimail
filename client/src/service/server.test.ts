import nock from 'nock';

import { createTemplate, updateTemplate } from './server';

afterEach(() => nock.cleanAll());

describe('createTemplate', () => {
  it('should return object', async () => {
    const scope = nock('http://localhost').post('/api/templates').reply(200, { id: 'aaaa', title: 'Hello World' });
    const result = await createTemplate({ title: 'testing' });
    expect(result).toHaveProperty('id', 'aaaa');
    expect(scope.isDone()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const scope = nock('http://localhost').post('/api/templates').reply(400, 'Bad Request');
    try {
      await createTemplate({ title: 'testing' });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toEqual('Request failed with status code 400');
    }
    expect(scope.isDone()).toBeTruthy();
  });
});

describe('updateTemplate', () => {
  it('should handle errors', async () => {
    const scope = nock('http://localhost').patch('/api/templates/aaaa').reply(400, 'Bad Request');
    try {
      await updateTemplate('aaaa', { title: 'testing' });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toEqual('Request failed with status code 400');
    }
    expect(scope.isDone()).toBeTruthy();
  });
});
