import { createDefaultConfig } from '@open-wc/building-rollup';

// if you need to support IE11 use "modern-and-legacy-config" instead.
// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// export default createCompatibilityConfig({ input: './index.html' });

const config = createDefaultConfig({ input: './index.html' });

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: false,
  },
  plugins: [...config.plugins, '@babel/plugin-proposal-class-properties'],
};
