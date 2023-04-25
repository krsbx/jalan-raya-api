import { NextFunction } from 'express';
import _ from 'lodash';
import asyncMw from 'express-asyncmw';
import SequelizeFQP from '@krsbx/sequelize-fqp';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { createCodeStatus } from '@krsbx/response-formatter';

export const queryParserMw = asyncMw<{
  reqQuery: {
    filters?: string;
  };
  extends: {
    filterQueryParams: NonNullable<unknown>;
  };
}>(async (req, res, next) => {
  req.filterQueryParams = req.query.filters
    ? SequelizeFQP(req.query.filters)
    : {};
  delete req.query.filters;

  return next();
});

export const errorHandlerMw = (
  err: unknown,
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  if (!err) return next();

  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    return res.status(400).json(_.pick(err, ['name', 'errors']));
  }

  console.log(err);

  return res.status(500).json(createCodeStatus(500));
};
