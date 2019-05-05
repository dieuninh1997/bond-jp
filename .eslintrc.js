// module.exports = {
//     "env": {
//         "es6": true,
//         "node": true
//     },
//     "extends": "eslint:recommended",
//     "globals": {
//         "Atomics": "readonly",
//         "SharedArrayBuffer": "readonly"
//     },
//     "parserOptions": {
//         "ecmaVersion": 2018,
//         "sourceType": "module"
//     },
//     "rules": {
//     }
// };
module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "indent": ["error", 2],
      "no-use-before-define": "off",
      "react/jsx-filename-extension": "off",
      "react/prop-types": "off",
      "react/prefer-stateless-function": "off",
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",
      "react/no-array-index-key": 'off',
      "global-require": "off",
      "class-methods-use-this": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off",
      "no-console": "off",
      "max-len": ["error", { "code": 1200 }],
      "react/no-string-refs": "off",
      "no-undef": "off",
      "no-return-await": "off",
      "react/sort-comp": "off",
      "react/jsx-no-duplicate-props": "off",
      "no-restricted-syntax": "off",
      "no-param-reassign": "off",
      "no-return-assign": "off",
      "camelcase": "off",
      "react/no-this-in-sfc": "off",
      "guard-for-in": "off",
      "no-plusplus": "off",
      "no-useless-escape": "off",
      "import/no-extraneous-dependencies": "off"
    }
  };
