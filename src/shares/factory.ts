/* eslint-disable no-use-before-define */
import _ from 'lodash';
import { Attributes, FindOptions, Model, ModelStatic, Op } from 'sequelize';

function factory<
  TModelAttributes extends NonNullable<unknown>,
  TCreationAttributes extends NonNullable<unknown>,
  TModel extends Model<TModelAttributes, TCreationAttributes> = Model<
    TModelAttributes,
    TCreationAttributes
  >,
  TModelStatic extends ModelStatic<
    Model<TModelAttributes, TCreationAttributes>
  > = ModelStatic<Model<TModelAttributes, TCreationAttributes>>
>(model: TModelStatic) {
  type TReturn = TModelStatic & {
    factory: {
      findAll: typeof findAll;
      modelToResource: <TResource extends NonNullable<unknown>>(
        // eslint-disable-next-line no-shadow
        model: TModel
      ) => Promise<TResource>;
      resourceToModel: <TResource extends NonNullable<unknown>>(
        resource: TResource
      ) => Promise<TCreationAttributes>;
    };
  };

  function findAll(
    options: FindOptions<Attributes<TModel>>,
    filterQueryParams: Record<any, any> = {},
    query: Record<any, any> = {}
  ) {
    const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
    const offset = query.page && query.page > 0 ? limit * (query.page - 1) : 0;
    let order =
      query.order && _.isArray(query.order)
        ? _.compact(query.order)
        : _.compact([query.order]);
    const otherOptions = _.omit(query, ['limit', 'offset', 'page', 'order']);

    const rules: unknown[] = [{ ...filterQueryParams }];

    const where = {
      ...(options?.where ?? {}),
    } as Record<any, any>;

    const AND = Op.and as never;

    if (where[AND]) {
      where[AND] = [...where[AND], ...rules];
    } else {
      where[AND] = rules;
    }

    if (options.order) {
      order = _([...(options.order as never), order])
        .filter(_.length)
        .compact()
        .value();

      // eslint-disable-next-line no-param-reassign
      delete options.order;
    }

    const queries = {
      ...options,
      where: where as never,
      offset,
      ...(limit > 0 ? { limit } : {}),
      order: order.length ? order : [['id', 'DESC']],
      ...otherOptions,
    };

    return model.findAndCountAll(queries);
  }

  Object.assign(model, {
    factory: {
      findAll,
    },
  });

  return model as TReturn;
}

export default factory;
