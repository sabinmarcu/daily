module.exports = {
  extends: ['eslint-config-airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [ '.js', '.jsx', '.mjs', '.ts', '.tsx' ]
      }
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "test/**",
          "tests/**",
          "spec/**",
          "**/__tests__/**",
          "**/__mocks__/**",
          "test.{js,jsx,ts,tsx}",
          "test-*.{js,jsx,ts,tsx}",
          "**/*{.,_}{test,spec}.{js,jsx,ts,tsx}",
          "**/jest.config.js",
          "**/jest.setup.js",
          "**/vue.config.js",
          "**/webpack.config.js",
          "**/webpack.config.*.js",
          "**/rollup.config.js",
          "**/rollup.config.*.js",
          "**/gulpfile.js",
          "**/gulpfile.*.js",
          "**/Gruntfile{,.js}",
          "**/protractor.conf.js",
          "**/protractor.conf.*.js",
          "**/karma.conf.js",
          "**/*.stories.{js,jsx,ts,tsx}",
          "**/stories/*.{js,jsx,ts,tsx}",
        ],
        "optionalDependencies": false
      }
    ],
  },
}
