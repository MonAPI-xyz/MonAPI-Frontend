const jestConfig = {
    preset: "jest-preset-preact",
    setupFiles: [
        "<rootDir>/tests/__mocks__/browserMocks.js",
        "<rootDir>/tests/__mocks__/setupTests.js"
      ],
    verbose: true,
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{mjs,js,jsx,ts,tsx}',
        '<rootDir>/{src,test,tests}/**/*.{spec,test}.{mjs,js,jsx,ts,tsx}',
        '<rootDir>/tests/**.test.js',
        '<rootDir>/tests/*/**.test.js',
        '<rootDir>/tests/*/*/**.test.js'
    ],
    transform: {
      "^.+\\.svg$": "<rootDir>/tests/transform/svgTransform.js" 
    }
  }
  
  module.exports = jestConfig