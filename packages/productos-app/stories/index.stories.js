import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { ProductosApp } from '../src/ProductosApp.js';
import '../productos-app.js';

storiesOf('productos-app', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(ProductosApp))
  .add(
    'Alternative Title',
    () => html`
      <productos-app .title=${'Something else'}></productos-app>
    `,
  );
