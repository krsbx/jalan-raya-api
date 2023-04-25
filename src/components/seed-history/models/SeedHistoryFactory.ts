import { SeedHistoryModel } from './attributes';

class SeedHistoryFactory {
  private static _instance: SeedHistoryModel;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static get instance() {
    return SeedHistoryFactory._instance;
  }

  public static init(model: SeedHistoryModel) {
    SeedHistoryFactory._instance = model;

    return model;
  }
}

export default SeedHistoryFactory;
