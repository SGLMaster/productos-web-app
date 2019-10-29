import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
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

  constructor() {
    super();
    this.products = [];
    this.failedFetch = false;
    this.loggedIn = false;
  }

  async fetchProducts() {
    try {
      const response = await fetch(
        'https://ancient-mesa-25039.herokuapp.com/productos?filter[limit]=10',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      this.products = await response.json();
    } catch (e) {
      this.failedFetch = true;
    }
  }

  firstUpdated() {
    this.fetchProducts();
  }

  stateChanged(state) {
    this.loggedIn = !!state.token;
  }

  render() {
    if (this.failedFetch) {
      return html`
        <h1>Error de conexión</h1>
      `;
    }

    if (this.products.length === 0) {
      return html`
        <h1>Cargando...</h1>
      `;
    }

    return html`
      <h1>Productos</h1>
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
            <mwc-button
              raised
              @click=${() =>
                this.shadowRoot
                  .querySelector('dialog-agregar-producto')
                  // @ts-ignore
                  .open()}
              >Agregar producto</mwc-button
            >
          `
        : ''}

      <dialog-agregar-producto @new-product-added=${this.fetchProducts}></dialog-agregar-producto>
    `;
  }
}
