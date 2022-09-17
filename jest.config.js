const jestConfig = {
    verbose: true,
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{mjs,js,jsx,ts,tsx}',
        '<rootDir>/{src,test,tests}/**/*.{spec,test}.{mjs,js,jsx,ts,tsx}',
        '<rootDir>/tests/**.test.js'
    ],
  }
  
  module.exports = jestConfig