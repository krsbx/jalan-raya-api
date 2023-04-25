import asyncMw from 'express-asyncmw';
import { createNotFoundResponse } from '@krsbx/response-formatter';
import JalanRaya from '../models';
import { BaseJalanRayaModel } from '../models/attributes';

export const getJalanRayaMw = asyncMw<{
  params: {
    id: string;
  };
  extends: {
    jalanRaya: BaseJalanRayaModel;
  };
}>(async (req, res, next) => {
  const jalanRaya = await JalanRaya.instance.findOne({
    where: {
      gid: req.params.id,
    },
  });

  if (!jalanRaya) {
    return res
      .status(404)
      .json(createNotFoundResponse(`Jalan Raya with GID (${req.params.id})`));
  }

  req.jalanRaya = jalanRaya;

  return next();
});

export const getJalanRayasMw = asyncMw<{
  extends: {
    jalanRayas: {
      rows: BaseJalanRayaModel[];
      count: number;
    };
  };
}>(async (req, res, next) => {
  const jalanRayas = await JalanRaya.instance.factory.findAll(
    {
      order: [['gid', 'ASC']],
    },
    req.filterQueryParams,
    req.query
  );

  req.jalanRayas = jalanRayas;

  return next();
});
