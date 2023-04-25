import { Model, ModelStatic } from 'sequelize';
import { GeoJsons } from 'sequelize-db-type/types';
import factory from '../../../shares/factory';
import postFactory from './postFactory';

export type JalanRayaAttribute = {
  gid: number;
  namrjl: string;
  konrjl: number;
  matrjl: number;
  fgsrjl: number;
  utkrjl: number;
  tolrjl: number;
  wlyrjl: number;
  autrjl: number;
  klsrjl: number;
  spcrjl: number;
  jparjl: number;
  arhrjl: number;
  starjl: number;
  kllrjl: string;
  medrjl: number;
  locrjl: number;
  jarrjl: number;
  fcode: string;
  remark: string;
  srs_id: string;
  lcode: string;
  metadata: string;
  shape_leng: number;
  geom: GeoJsons['MultiLineString'];
};

export type CreateJalanRayaAttribute = Partial<JalanRayaAttribute>;

export type BaseJalanRayaModel = Model<
  JalanRayaAttribute,
  CreateJalanRayaAttribute
>;

export type JalanRayaModel = ModelStatic<BaseJalanRayaModel> & {
  factory: ReturnType<
    typeof factory<JalanRayaAttribute, CreateJalanRayaAttribute>
  >['factory'] &
    ReturnType<typeof postFactory>;
};
