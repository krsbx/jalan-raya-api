import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import {
  createResourceResponse,
  createResourcesResponse,
} from '@krsbx/response-formatter';
import JalanRaya from '../models';
import { BaseJalanRayaModel } from '../models/attributes';

export const returnJalanRayaMw = asyncMw<{
  extends: {
    jalanRaya: BaseJalanRayaModel;
  };
}>(async (req, res) => {
  return res
    .status(200)
    .json(
      createResourceResponse(
        req,
        await JalanRaya.instance.factory.modelToResource(req.jalanRaya)
      )
    );
});

export const returnJalanRayasMw = asyncMw<{
  extends: {
    jalanRayas: {
      rows: BaseJalanRayaModel[];
      count: number;
    };
  };
}>(async (req, res) => {
  return res.status(200).json(
    createResourcesResponse(req, {
      rows: await Promise.all(
        _.map(req.jalanRayas.rows, JalanRaya.instance.factory.modelToResource)
      ),
      count: req.jalanRayas.count,
    })
  );
});
