// setupTests.js
import { TextEncoder, TextDecoder } from 'util';
import fetch, { Response, Request, Headers } from 'node-fetch';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Polyfills
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

const { ReadableStream } = require('web-streams-polyfill/ponyfill');
global.ReadableStream = ReadableStream;

// Configurar fetch
global.fetch = fetch;
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

// Handlers
const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json([
      { userId: 1, id: 1, title: "title 1", body: "body 1" },
      { userId: 2, id: 2, title: "title 2", body: "body 2" },
      { userId: 3, id: 3, title: "title 3", body: "body 3" }
    ]);
  })
];

const server = setupServer(...handlers);

// Configuração do servidor
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
