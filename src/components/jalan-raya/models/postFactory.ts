import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
import {
  BaseJalanRayaModel,
  JalanRayaAttribute,
  JalanRayaModel,
} from './attributes';

function postFactory(factoryModel: JalanRayaModel) {
  async function modelToResource<
    TModel extends BaseJalanRayaModel,
    TResource extends NonNullable<unknown>
  >(model: TModel) {
    const resource = model.toJSON?.();

    return resource as unknown as TResource;
  }

  async function resourceToModel<TResource extends NonNullable<unknown>>(
    resource: TResource | JalanRayaAttribute
  ) {
    const model = _.pick(resource, [
      'namrjl',
      'konrjl',
      'matrjl',
      'fgsrjl',
      'utkrjl',
      'tolrjl',
      'wlyrjl',
      'autrjl',
      'klsrjl',
      'spcrjl',
      'jparjl',
      'arhrjl',
      'starjl',
      'kllrjl',
      'medrjl',
      'locrjl',
      'jarrjl',
      'fcode',
      'remark',
      'srs_id',
      'lcode',
      'metadata',
      'shape_leng',
      'geom',
    ]);

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
