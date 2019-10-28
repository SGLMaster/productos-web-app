import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';

import '../../page-main/page-main.js';
import '../../page-productos/page-productos.js';
import '../../dialog-login/dialog-login.js';

export class ProductosApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      token: { type: String },
    };
  }

  constructor() {
    super();
    this.page = '';
    this.token = '';
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
    this.switchRoute('');
  }

  switchRoute(page) {
    this.page = page;
    Router.go(`/${page}`);
  }

  openDialogLogin() {
    // @ts-ignore
    this.shadowRoot.querySelector('dialog-login').open();
  }

  handleLoginSuccess(event) {
    this.token = event.detail;
  }

  render() {
    return html`
      <header>
        <mwc-tab-bar>
          <mwc-tab label="Inicio" @click=${() => this.switchRoute('')}></mwc-tab>
          <mwc-tab label="Productos" @click=${() => this.switchRoute('productos')}></mwc-tab>
          <mwc-tab label="Contacto" @click=${() => this.switchRoute('')}></mwc-tab>

          ${this.token
            ? ''
            : html`
                <mwc-button @click=${() => this.openDialogLogin()} raised> Ingresar</mwc-button>
              `}
        </mwc-tab-bar>
      </header>

      <dialog-login @login-success=${this.handleLoginSuccess}></dialog-login>

      <main id="outlet"></main>

      <p class="app-footer">
        Hecho por
        <a target="_blank" rel="noopener noreferrer" href="https://apps2go.tech">apps2go</a>.
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
