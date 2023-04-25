import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS postgis',
      {
        raw: true,
      }
    );
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS postgis', {
      raw: true,
    });
  },
};
