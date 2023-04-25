import { DataTypes as DT, Model, Sequelize } from 'sequelize';
import { Database } from 'sequelize-db-type/helper';
import { CreateSeedHistoryAttribute, SeedHistoryAttribute } from './attributes';
import factory from '../../../shares/factory';
import SeedHistoryFactory from './SeedHistoryFactory';
import postFactory from './postFactory';

function init(sequelize: Sequelize, DataTypes: typeof DT) {
  class SeedHistory extends Model<
    SeedHistoryAttribute,
    CreateSeedHistoryAttribute
  > {
    static associate(models: Database) {}
  }

  SeedHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: true,
        defaultValue: null,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'seed-histories',
    }
  );

  const factored = factory(SeedHistory);
  postFactory(factored as never);

  SeedHistoryFactory.init(factored as never);

  return SeedHistory;
}

export default init;
