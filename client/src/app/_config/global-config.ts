export class GlobalConfig {
  static get CLIENT_SETTINGS() {
    return {
      domain: 'http://localhost:8888',
      successMessageClass: 'alert alert-success',
      errorMessageClass: 'alert alert-danger'
    };
  }
}
