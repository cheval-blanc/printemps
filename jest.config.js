module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // 'vue',
  ],
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!node_modules/**',
    '!build/**',
    '!coverage/**',
    '!*.config.js',
  ],
};
