import { Model, ModelStatic } from 'sequelize';
import factory from '../../../shares/factory';
import postFactory from './postFactory';

export type SeedHistoryAttribute = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type CreateSeedHistoryAttribute = CreateOptional<
  SeedHistoryAttribute,
  'id' | 'createdAt' | 'updatedAt'
>;

export type BaseSeedHistoryModel = Model<
  SeedHistoryAttribute,
  CreateSeedHistoryAttribute
>;

export type SeedHistoryModel = ModelStatic<BaseSeedHistoryModel> & {
  factory: ReturnType<
    typeof factory<SeedHistoryAttribute, CreateSeedHistoryAttribute>
  >['factory'] &
    ReturnType<typeof postFactory>;
};
