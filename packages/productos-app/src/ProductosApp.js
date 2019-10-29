import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import { connect } from 'pwa-helpers';
import Dexie from 'dexie';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';

import '../../page-main/page-main.js';
import '../../page-productos/page-productos.js';
import '../../dialog-login/dialog-login.js';

import { store } from '../../redux/store.js';
import { updateToken } from '../../redux/actions/actions.js';

const authDb = new Dexie('authDb');

export class ProductosApp extends connect(store)(LitElement) {
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

  configureRouter() {
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

  // eslint-disable-next-line class-methods-use-this
  async loadTokenFromDb() {
    try {
      const result = await authDb
        .table('auth')
        .where('token')
        .notEqual('')
        .first();
      if (result) {
        const { token } = result;
        store.dispatch(updateToken(token));
      }
    } catch (error) {
      console.log(error);
    }
  }

  firstUpdated() {
    authDb.version(1).stores({ auth: 'token' });
    this.loadTokenFromDb();
    this.configureRouter();
  }

  switchRoute(page) {
    this.page = page;
    Router.go(`/${page}`);
  }

  openDialogLogin() {
    // @ts-ignore
    this.shadowRoot.querySelector('dialog-login').open();
  }

  stateChanged(state) {
    this.token = state.token;

    if (this.token && authDb) {
      authDb.table('auth').put({ token: this.token });
    }
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

      <dialog-login></dialog-login>

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
