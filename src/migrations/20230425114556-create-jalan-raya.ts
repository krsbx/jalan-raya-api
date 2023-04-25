import Sequel, { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof Sequel) {
    await queryInterface.createTable('jalan-rayas', {
      gid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      konrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      matrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      fgsrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      utkrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      tolrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      wlyrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      autrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      klsrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      spcrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      jparjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      arhrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      starjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      kllrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      medrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      locrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      jarrjl: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.FLOAT,
      },
      fcode: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      remark: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      srs_id: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      lcode: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      metadata: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING,
      },
      shape_leng: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DOUBLE,
      },
    });

    await queryInterface.sequelize.query(
      `SELECT AddGeometryColumn('','jalan-rayas','geom','4326','MULTILINESTRING',4)`
    );
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('jalan-rayas');
  },
};
