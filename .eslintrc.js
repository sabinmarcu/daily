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
  }
}
