import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';

import '../../page-main/page-main.js';
import '../../page-productos/page-productos.js';

export class ProductosApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = '';
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      { path: '/', component: 'page-main' },
      { path: '/productos', component: 'page-productos' },
      {
        path: '(.*)',
        redirect: '/',
        action: () => {
          this.page = '';
        },
      },
    ]);
  }

  switchRoute(page) {
    this.page = page;
    Router.go(`/${page}`);
  }

  openLoginDialog() {
    this.shadowRoot.querySelector('mwc-dialog').open = true;
  }

  render() {
    return html`
      <header>
        <mwc-tab-bar>
          <mwc-tab label="Inicio" @click=${() => this.switchRoute('')}></mwc-tab>
          <mwc-tab label="Productos" @click=${() => this.switchRoute('productos')}></mwc-tab>
          <mwc-tab label="Contacto" @click=${() => this.switchRoute('')}></mwc-tab>
          <mwc-button @click=${() => this.openLoginDialog()} raised>Ingresar</mwc-button>
        </mwc-tab-bar>
      </header>

      <mwc-dialog title="Ingreso">
        <div>
          Por favor ingrese sus datos si desea acceder:
        </div><br>
        <mwc-textfield label="Usuario" dialogInitialFocus></mwc-textfield><br><br>
        <mwc-textfield label="Contraseña"></mwc-textfield>
        <mwc-button slot="primaryAction" dialogAction="loginUser">Ingresar</mwc-button>
      </mwc-dialog>

      <main id="outlet"></main>

      <p class="app-footer">
        🚽 Made with love by
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc">open-wc</a>.
      </p>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
          max-width: 960px;
          margin: 0 auto;
        }

        header {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #ccc;
        }

        mwc-button {
          --mdc-theme-primary: green;
          --mdc-theme-on-primary: white;
          margin-top: 5px;
        }

        main {
          flex-grow: 1;
        }

        .app-footer {
          color: #a8a8a8;
          font-size: calc(12px + 0.5vmin);
          align-items: center;
        }

        .app-footer a {
          margin-left: 5px;
        }
      `,
    ];
  }
}
