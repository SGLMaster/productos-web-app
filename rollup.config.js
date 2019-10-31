import cpy from 'rollup-plugin-cpy';
import { createDefaultConfig } from '@open-wc/building-rollup';

const config = createDefaultConfig({ input: './index.html' });

export default [
  // add plugin to the first config
  {
    ...config,
    plugins: [
      ...config.plugins,
      cpy({
        files: ['**/*.png', 'manifest.json', 'service-worker.js'],
        dest: 'dist',
        options: {
          // parents makes sure to preserve the original folder structure
          parents: true,
        },
      }),
    ],
  },
];
