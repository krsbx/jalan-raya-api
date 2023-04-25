/* eslint-disable import/no-import-module-exports */
import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import { QueryInterface, DatabaseError } from 'sequelize';
import { SEEDER_NAME } from '../utils/constant';
import { SeedHistoryAttribute } from '../components/seed-history/models/attributes';
import * as helper from './helper';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const [[seedHistory]] = await queryInterface.sequelize.query(
      `SELECT * FROM "seed-histories"`
    );

    if (seedHistory) {
      console.log('Seeded GIS Data already exists in DB');
      console.log('Skipping Seeding GIS Data to DB');

      return;
    }

    const now = new Date();

    try {
      const sqlDirPath = path.resolve(__dirname, '../..', 'sqls');

      const dirs = (await fs.readdir(sqlDirPath)).filter(
        (fileName) => fileName.split('.').pop() === 'sql'
      );

      const sqls = await helper.joinSqlFiles(
        ...dirs.map((name) => path.join(sqlDirPath, name))
      );

      if (!sqls) return;

      const historyData = {
        name: SEEDER_NAME.SEED_JALAN_RAYA,
        createdAt: now,
        updatedAt: now,
      };

      await queryInterface.sequelize.transaction((transaction) =>
        Promise.all([
          ..._.map(sqls, (sql) =>
            queryInterface.sequelize.query(sql, {
              transaction,
            })
          ),
          queryInterface.insert(null, 'seed-histories', historyData, {
            transaction,
          }),
        ])
      );

      console.log('Seeding GIS Data completed');
    } catch (err) {
      if (err instanceof DatabaseError) {
        console.log(_.pick(err, ['name', 'message']));
      }
      console.log('Error while seeding GIS Data in DB');
    }
  },

  async down(queryInterface: QueryInterface) {
    const [[seedHistory]] = await queryInterface.sequelize.query(
      `SELECT * FROM "seed-histories"`
    );

    if (!seedHistory) {
      console.log('No GIS Data found in DB, returning...');

      return;
    }

    await queryInterface.sequelize.transaction((transaction) =>
      Promise.all([
        queryInterface.sequelize.query(
          `DELETE FROM "seed-histories" WHERE id = ${
            (seedHistory as SeedHistoryAttribute).id
          }`,
          { transaction }
        ),

        queryInterface.sequelize.query(`TRUNCATE "jalan-rayas"`, {
          transaction,
        }),
      ])
    );
  },
};
