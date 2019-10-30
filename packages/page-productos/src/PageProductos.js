import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import Dexie from 'dexie';
import { store } from '../../redux/store.js';

import '@material/mwc-button';

import '../../dialog-agregar-producto/dialog-agregar-producto.js';

export class PageProductos extends connect(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        text-align: center;
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
      loggedIn: { type: Boolean },
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
    this.loggedIn = false;

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

  async openDialogAgregarProducto() {
    // @ts-ignore
    this.shadowRoot.querySelector('dialog-agregar-producto').open = true;
  }

  firstUpdated() {
    this.updateProducts();
  }

  stateChanged(state) {
    this.loggedIn = !!state.token;
  }

  render() {
    return html`
      <h1>Productos</h1>
      ${this.products.length === 0
        ? html`
            <h1>Cargando...</h1>
          `
        : ''}
      <ul>
        ${this.products.map(
          product => html`
            <li>
              ${product.nombre}
              <div>${product.desc}</div>
            </li>
            <br />
          `,
        )}
      </ul>
      ${this.loggedIn
        ? html`
            <mwc-button raised @click=${this.openDialogAgregarProducto}
              >Agregar producto</mwc-button
            >
          `
        : ''}

      <dialog-agregar-producto @new-product-added=${this.updateProducts}> </dialog-agregar-producto>
    `;
  }
}
