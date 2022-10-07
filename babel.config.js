module.exports = {
  presets: [['@babel/env', { targets: 'defaults' }], '@babel/react', '@babel/typescript'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    'syntax-dynamic-import',
  ],
};
