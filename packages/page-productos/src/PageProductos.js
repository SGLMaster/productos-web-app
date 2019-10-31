import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import Dexie from 'dexie';
import { store } from '../../redux/store.js';

import '@material/mwc-button';
import '@material/mwc-fab';

import '../../dialog-agregar-producto/dialog-agregar-producto.js';
import '../../card-producto/card-producto.js';

export class PageProductos extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        background-color: white;
      }

      :host h1 {
        float: left;
      }

      :host .fabs {
        float: right;
        margin-top: 35px;
      }

      ul li {
        font-weight: bold;
        text-align: left;
      }

      ul li div {
        font-weight: normal;
      }
    `;
  }

  static get properties() {
    return {
      products: { type: Array },
      failedFetch: { type: Boolean },
      token: { type: String },
    };
  }

  async populateProducts() {
    const response = await fetch('https://ancient-mesa-25039.herokuapp.com/productos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const products = await response.json();

    await this._db.table('productos').bulkAdd(products);
    return this.updateProducts();
  }

  constructor() {
    super();
    this.products = [];
    this.failedFetch = false;
    this.token = '';

    this._db = new Dexie('productos_db');
    this._db.version(1).stores({ productos: 'id,nombre' });
    this._db.open();
    this._db.on('populate', () => this.populateProducts());
  }

  async updateProducts() {
    try {
      this.products = await this._db
        .table('productos')
        .orderBy('id')
        .toArray();
    } catch (e) {
      this.failedFetch = true;
    }
  }

  async getOfflineLastModifiedDates() {
    const localProductsById = await this._db
      .table('productos')
      .orderBy('id')
      .toArray();
    return localProductsById.map(prod => ({
      id: prod.id,
      lastModified: new Date(prod.lastModified),
    }));
  }

  getOnlineLastModifiedDates = async () => {
    const response = await fetch(
      'https://ancient-mesa-25039.herokuapp.com/' +
        'productos?filter[fields][id]=true&filter[fields][lastModified]=true&filter[order]=id',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const partials = await response.json();

    return partials.map(partial => ({
      ...partial,
      lastModified: new Date(partial.lastModified),
    }));
  };

  getProductWithId = async id => {
    const res = await fetch(`https://ancient-mesa-25039.herokuapp.com/productos/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  };

  async retrieveModifiedProducts(localDates, onlineDates) {
    const datesToSync = localDates.filter(
      (local, index) => local.lastModified.getTime() < onlineDates[index].lastModified.getTime(),
    );
    datesToSync.forEach(async date => {
      const product = await this.getProductWithId(date.id);

      await this._db.table('productos').put(product);
    });
  }

  async retrieveNewProducts(newProductsIds) {
    newProductsIds.forEach(async id => {
      console.log(`adding new product with id ${id}`);
      const product = await this.getProductWithId(id);

      await this._db.table('productos').put(product);
      await this.updateProducts();
    });
  }

  async cleanDeletedProducts(deletedProductsIds) {
    deletedProductsIds.forEach(async id => {
      console.log(`deleting local product with id ${id}`);
      await this._db.table('productos').delete(id);
    });
  }

  async syncProducts() {
    try {
      console.log('startig sync');
      // Checking the offline lastModified dates
      const localDates = await this.getOfflineLastModifiedDates();
      const localIds = localDates.map(date => date.id);

      // Checking online
      const onlineDates = await this.getOnlineLastModifiedDates();
      const onlineIds = onlineDates.map(date => date.id);

      // If both arrays are equal
      if (JSON.stringify(onlineDates) === JSON.stringify(localDates)) {
        await this.retrieveModifiedProducts(localDates, onlineDates);
      } else {
        const newProductsIds = onlineIds.filter(x => !localIds.includes(x));
        this.retrieveNewProducts(newProductsIds);
        console.log(newProductsIds);

        const deletedProductsIds = localIds.filter(x => !onlineIds.includes(x));
        this.cleanDeletedProducts(deletedProductsIds);
        await this.updateProducts();
        console.log(deletedProductsIds);
      }
      console.log('sync finished succesfully');
    } catch (error) {
      console.log(error.message);
    }
  }

  async onDeleteProductClicked(event) {
    try {
      const id = event.detail;
      const response = await fetch(`https://ancient-mesa-25039.herokuapp.com/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
      });
      const { status } = response;

      if (status === 204) {
        this.syncProducts();
      } else {
        const { error } = await response.json();
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async openDialogAgregarProducto() {
    // @ts-ignore
    this.shadowRoot.querySelector('dialog-agregar-producto').open = true;
  }

  firstUpdated() {
    this.updateProducts();
  }

  stateChanged(state) {
    this.token = state.token;
  }

  render() {
    return html`
      <h1>Productos</h1>
      <div class="fabs">
        ${this.token
          ? html`
              <mwc-fab @click=${this.openDialogAgregarProducto} icon="add_circle"></mwc-fab>
            `
          : ''}
        <mwc-fab @click=${this.syncProducts} icon="sync"></mwc-fab>
      </div>
      <div style="clear: both;"></div>
      ${this.products.length === 0
        ? html`
            <h1>Cargando...</h1>
          `
        : ''}
      <div>
        ${this.products.map(
          product => html`
            <card-producto
              id=${product.id}
              name=${product.nombre}
              description=${product.desc}
              @delete-product-clicked=${this.onDeleteProductClicked}
              ?showDeleteButton=${!!this.token}
            >
            </card-producto>
          `,
        )}
      </div>
      <dialog-agregar-producto @new-product-added=${this.syncProducts}> </dialog-agregar-producto>
    `;
  }
}
