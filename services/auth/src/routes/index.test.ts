import { SuperTest, Test } from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { HTTP_OK } from '../const';
import { cleanDatabase, closeServer, openServer, ormConfigs } from '../test';
import { KoaServer } from '../types/koa';
import { buildString, env } from '../util';

let connection: Connection;
let server: KoaServer;
let request: SuperTest<Test>;

// eslint-disable-next-line no-console
console.log = jest.fn();

beforeAll(async () => {
  connection = await createConnection(
    ormConfigs.worker(parseInt(env('JEST_WORKER_ID'), 10))
  );
});

afterAll(async () => {
  await connection?.close();
});

beforeEach(async () => {
  await cleanDatabase(connection);

  const { server: _server, request: _request } = openServer();
  server = _server;
  request = _request;
});

afterEach(async () => {
  await closeServer(server);
});

describe('A trivial test', () => {
  test('Server is alive and responding', async () => {
    const response = await request.get('/').expect(HTTP_OK);
    expect(response.body).toEqual({ msg: `${buildString()} is alive!` });
  });
});
