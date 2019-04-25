import {AuthApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {AuthApplication};

export async function main(options: ApplicationConfig = {}) {
  options.rest = {port:3010,basePath: '/api',}

  const app = new AuthApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
