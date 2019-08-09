/* eslint-disable no-process-env, no-undef */
const path = require('path');

const resourcePrefix = '';
const rootDir = path.resolve(__dirname, '..');
const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');
const aliases = {
  '~': path.resolve(rootDir, 'src'),
  '~app': path.resolve(rootDir, 'app', 'src'),
  '~actions': path.resolve(rootDir, 'app', 'src', 'actions'),
  '~constants': path.resolve(rootDir, 'app', 'src', 'constants'),
  '~components': path.resolve(rootDir, 'app', 'src', 'components'),
  '~forms': path.resolve(rootDir, 'app', 'src', 'forms'),
  '~reducers': path.resolve(rootDir, 'app', 'src', 'reducers'),
  '~utils': path.resolve(rootDir, 'app', 'src', 'utils'),
  '~const': path.resolve(rootDir, 'src', 'const'),
  '~mock': path.resolve(rootDir, 'mock-server', 'app', 'routes', 'mock'),
  '~test': path.resolve(rootDir, 'test')
};
const threadLoader = { workerParallelJobs: 50, poolRespawn: false };
const htmlPlugin = {
  inject: false,
  hash: true,
  template: './app/src/index.html',
  filename: 'index.html',
  favicon: './app/resources/favicon.ico'
};

module.exports = { resourcePrefix, rootDir, cacheDir, aliases, threadLoader, htmlPlugin };
