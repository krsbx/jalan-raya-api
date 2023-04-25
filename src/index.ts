import { config as dotEnvConfig } from 'dotenv';
import express from 'express';
import db from './models';
import root from './shares/root';

dotEnvConfig();

const PORT = +(process.env.PORT ?? 3001);

db.sequelize.sync();

const app = express();

app.listen(PORT, () => console.log(`Server are runnig @ PORT : ${PORT}`));

root(app);
