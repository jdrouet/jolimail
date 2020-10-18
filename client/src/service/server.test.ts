import nock from 'nock';

import { createTemplate } from './server';

test('createTemplate', async () => {
  const scope = nock('http://localhost').post('/api/templates').reply(400, 'Bad Request');
  try {
    await createTemplate({ title: 'testing' });
    expect(true).toBeFalsy();
  } catch (err) {
    expect(err.message).toEqual('Request failed with status code 400');
  }
  expect(scope.isDone()).toBeTruthy();
  nock.cleanAll();
});
