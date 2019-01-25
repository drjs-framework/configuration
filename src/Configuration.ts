export interface ConfigurationObject {
  [key: string]: any,
}

export default class Configuration {
  config: ConfigurationObject;

  constructor(config: Object = {}) {
    this.config = config;
  }

  get(name: string): any {
    if (this.isADeepKey(name)) {
      const keys = name.split('.');
      let value = this.config;

      keys.forEach((key) => {
        value = value[key];
        if (typeof value === 'undefined') {
          throw Error(`The parameter '${name}' not exist`);
        }
      });
      return value;
    }

    if (!this.has(name)) {
      throw Error(`The parameter '${name}' not exist`);
    }



    return this.config[name];
  }

  has(name: string): boolean {
    if (this.isADeepKey(name)) {
      const keys = name.split('.');
      let value = this.config;

      keys.forEach((key) => {
        value = value[key];
        if (typeof value === 'undefined') {
          return false;
        }        
      });
      
      return true;
    }

    if (typeof this.config[name] !== 'undefined') {
      return true;
    }
    return false;
  }

  add(name: string, value: any, overwrite:boolean = false): void {
    if (this.config[name] && !overwrite) {
      throw new Error(`The parameter ${name} already exists`);
    } else {
      this.config[name] = value;
    }
  }

  remove(name: string): boolean {
    if (this.config[name]) {
      delete this.config[name];
      return true;
    }

    return false;
  }

  isADeepKey(name: string): boolean {
    return name.indexOf('.') > -1;
  }
}
