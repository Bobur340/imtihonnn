export default {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleFileExtensions: ['ts', 'js', 'json'],

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  testRegex: '.*\\.spec\\.ts$',

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
