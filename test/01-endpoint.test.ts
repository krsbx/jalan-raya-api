import {
  createMockReqRes,
  extractMw,
  mockApp,
  mockNexFn,
  resolveMiddleware,
} from './utils/common';

import jalanRayaSeeder from '../src/seeders/seed-jalan-raya-gis';
import middlewares from '../src/components/jalan-raya/middlewares';

describe('Jalan Raya : API', () => {
  const appDb: ReturnType<typeof mockApp> = {} as never;

  beforeAll(() => {
    const mockedApp = mockApp();

    Object.assign(appDb, mockedApp);
  });

  it('Can seed the database base on the state of the DB', async () => {
    await jalanRayaSeeder.up(appDb.db.sequelize.getQueryInterface());

    const seedDatas = await appDb.db['seed-histories'].findAndCountAll();

    expect(seedDatas.count).toBeGreaterThan(0);
  });

  it('Can get multiple jalan raya', async () => {
    const { req, res } = createMockReqRes({
      url: '/jalan-rayas',
      query: {
        limit: 5,
      },
    });

    const mw = extractMw(middlewares.read.getJalanRayasMw);

    await resolveMiddleware({ req, res, mw });

    expect(req.jalanRayas).toBeDefined();
    expect(req.jalanRayas.rows).toBeDefined();
    expect(req.jalanRayas.rows.length).toBe(5);
  });

  it('Can get single jalan raya base on gid', async () => {
    const { req, res } = createMockReqRes({
      url: '/jalan-rayas/1',
      params: {
        id: 1,
      },
    });

    const mw = extractMw(middlewares.read.getJalanRayaMw);

    await resolveMiddleware({ req, res, mw });

    expect(req.jalanRaya.dataValues).toBeDefined();
    expect(req.jalanRaya.dataValues.gid).toBe(1);
  });

  it('Can return multiple jalan raya in JSON format', async () => {
    const { req, res } = createMockReqRes({
      url: '/jalan-rayas',
      query: {
        limit: 5,
      },
    });

    const mw = extractMw(middlewares.read.getJalanRayasMw);
    await resolveMiddleware({ req, res, mw });

    const mw1 = extractMw(middlewares.response.returnJalanRayasMw);
    await mw1(req, res, mockNexFn);

    expect(res.statusCode).toBe(200);
  });

  it('Can return single jalan raya in JSON format', async () => {
    const { req, res } = createMockReqRes({
      url: '/jalan-rayas/1',
      params: {
        id: 1,
      },
    });

    const mw = extractMw(middlewares.read.getJalanRayaMw);
    await resolveMiddleware({ req, res, mw });

    const mw1 = extractMw(middlewares.response.returnJalanRayaMw);
    await mw1(req, res, mockNexFn);

    const { data } = res._getJSONData();

    expect(data).toBeDefined();
  });
});
