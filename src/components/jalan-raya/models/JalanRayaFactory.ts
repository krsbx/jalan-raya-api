import { JalanRayaModel } from './attributes';

class JalanRayaFactory {
  private static _instance: JalanRayaModel;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static get instance() {
    return JalanRayaFactory._instance;
  }

  public static init(model: JalanRayaModel) {
    JalanRayaFactory._instance = model;

    return model;
  }
}

export default JalanRayaFactory;
