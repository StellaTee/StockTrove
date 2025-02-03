/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@testing-library/react).+\\.js$"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
 ],
 moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',},
    
  
  };