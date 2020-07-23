module.exports = {
    env: {
        es6: true,
        node: true,
        'react-native/react-native': true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        fetch: false,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'react-native', 'prettier'],
    rules: {
        'class-methods-use-this': 'off',
        'no-use-before-define': 'off',
        'no-underscore-dangle': 'off',
        'no-reserved-keys': 'off',
        'react/prop-types': 'warn',
        'react/jsx-filename-extension': 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                trailingComma: 'es5',
            },
        ],
        'no-unused-vars': 'off',
        'lines-between-class-members': [
            'error',
            'always',
            {exceptAfterSingleLine: true},
        ],
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [],
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            },
        },
    },
};
