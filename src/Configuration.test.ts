import Configuration, { ConfigurationObject } from './Configuration';

describe('Configuration', () => {
  let configuration: ConfigurationObject;
  beforeEach(() => {
    configuration = new Configuration({test: 'a'});
  });
  test('Constructor should save the configuration', () => {
    expect(configuration.config).toEqual({test: 'a'});
  });

  describe('get function', () => {
    test('Get function return a parameter', () => {
      expect(configuration.get('test')).toBe('a');
    });
  
    test('Get function throw error if the parameter not exists', () => {
      expect(() => {
        configuration.get('testb');
      }).toThrowError('The parameter \'testb\' not exist');
    }); 

    test('When pass a parameter with \'.\' return a deep value', () => {
      configuration = new Configuration({ test: { deep: 'a' } });

      expect(configuration.get('test.deep')).toBe('a');
    });
  });

  describe('has function', () => {
    test('Has function return true if exist the parameter', () => {
      expect(configuration.has('test')).toBeTruthy();
    });
  
    test('Has function return false if not exist the parameter', () => {
      expect(configuration.has('noparam')).toBeFalsy();
    });

    test('When pass a parameter with \'.\' check if exist a deep value', () => {
      configuration = new Configuration({ test: { deep: 'a' } });

      expect(configuration.has('test.deep')).toBeTruthy();
    }); 
  });

  describe('Add function', () => {
    test('Add parameter', () => {
      configuration = new Configuration();

      configuration.add('test', 'a');
      expect(configuration.config).toEqual({ test: 'a' })
    });

    test('Add parameter should throw error if the parameter already exists', () => {
      expect(() => {
        configuration.add('test', 'a')
      }).toThrowError(`The parameter test already exists`);
    });    
  });

  test('Remove function', () => {
    expect(configuration.remove('test')).toBeTruthy();
    expect(configuration.config).toEqual({});
  });

  test('Remove function return false if the parameter not exists', () => {
    expect(configuration.remove('testb')).toBeFalsy();
    expect(configuration.config).toEqual({test: 'a'});
  });

  
});