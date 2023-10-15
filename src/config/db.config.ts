import { DataSource, DataSourceOptions } from 'typeorm';

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'root',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const ormConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['dist/**/*.entity{.ts,.js}'],
};

const ormConfigCli: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
};

const datasource = new DataSource(ormConfigCli);

export default datasource;
