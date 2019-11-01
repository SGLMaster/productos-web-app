import cpy from 'rollup-plugin-cpy';

const createDefaultConfig = require('./packages/building-rollup/modern-config.js');

const config = createDefaultConfig({ input: './index.html', plugins: { workbox: true } });

export default [
  // add plugin to the first config
  {
    ...config,
    plugins: [
      ...config.plugins,
      cpy({
        files: ['**/*.png', 'manifest.json'],
        dest: 'dist',
        options: {
          // parents makes sure to preserve the original folder structure
          parents: true,
        },
      }),
    ],
  },
];
