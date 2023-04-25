import { DataTypes as DT, Model, Sequelize } from 'sequelize';
import { Database } from 'sequelize-db-type/helper';
import { CreateJalanRayaAttribute, JalanRayaAttribute } from './attributes';
import factory from '../../../shares/factory';
import JalanRayaFactory from './JalanRayaFactory';
import postFactory from './postFactory';

function init(sequelize: Sequelize, DataTypes: typeof DT) {
  class JalanRaya extends Model<JalanRayaAttribute, CreateJalanRayaAttribute> {
    static associate(models: Database) {}
  }

  JalanRaya.init(
    {
      gid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      namrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      konrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      matrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      fgsrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      utkrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      tolrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      wlyrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      autrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      klsrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      spcrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      jparjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      arhrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      starjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      kllrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      medrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      locrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      jarrjl: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.FLOAT,
      },
      fcode: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      remark: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      srs_id: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      lcode: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      metadata: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      shape_leng: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.DOUBLE,
      },
      geom: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.GEOMETRY('MULTILINESTRING', 4326),
      },
    },
    {
      sequelize,
      modelName: 'jalan-rayas',
    }
  );

  const factored = factory(JalanRaya);
  postFactory(factored as never);

  JalanRayaFactory.init(factored as never);

  return JalanRaya;
}

export default init;
