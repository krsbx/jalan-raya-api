import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import {
  BaseSeedHistoryModel,
  SeedHistoryAttribute,
  SeedHistoryModel,
} from './attributes';

function postFactory(factoryModel: SeedHistoryModel) {
  async function modelToResource<
    TModel extends BaseSeedHistoryModel,
    TResource extends NonNullable<unknown>
  >(model: TModel) {
    const resource = model.toJSON?.();

    return resource as unknown as TResource;
  }

  async function resourceToModel<TResource extends NonNullable<unknown>>(
    resource: TResource | SeedHistoryAttribute
  ) {
    const model = _.pick(resource, ['name']);

    return model;
  }

  Object.assign(factoryModel.factory, {
    modelToResource,
    resourceToModel,
  });

  return {
    modelToResource,
    resourceToModel,
  };
}

export default postFactory;
