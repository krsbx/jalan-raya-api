import httpMocks from 'node-mocks-http';
import express from 'express';
import db from '../../src/models';
import root from '../../src/shares/root';

export const consoleDisabler = {
  log() {
    Object.assign(console, {
      mock: {
        log: console.log,
      },
      log(...arg: never[]) {
        return arg;
      },
    });
  },
};

export function mockApp() {
  consoleDisabler.log();

  db.sequelize.sync();

  const app = express();

  root(app);

  return {
    app,
    db,
  };
}

export function extractMw<T, U extends T extends Array<unknown> ? T[0] : T>(
  mws: T
): U {
  return Array.isArray(mws) ? mws[0] : mws;
}

export function createMockReqRes({
  url,
  method = 'GET',
  body = {},
  query = {},
  params = {},
}: {
  url: string;
  method?: httpMocks.RequestMethod;
  body?: httpMocks.Body;
  query?: httpMocks.Query;
  params?: httpMocks.Params;
}) {
  const { req, res } = httpMocks.createMocks({
    url,
    method,
    query,
    params,
    body,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });

  return { req, res };
}

export function resolveMiddleware<T, U>({
  req,
  res,
  mw,
}: {
  mw: express.RequestHandler;
  req: T;
  res: U;
}) {
  return new Promise<void>((resolve, reject) => {
    mw(req as never, res as never, (err: unknown) => {
      if (err instanceof Error) {
        reject(err);
      }

      resolve();
    });
  });
}

export function mockNexFn() {
  return null;
}
