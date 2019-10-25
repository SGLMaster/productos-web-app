import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import '@material/mwc-tab-bar';
import '@material/mwc-tab';

import '../../page-main/page-main.js';
import '../../page-one/page-one.js';

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
      { path: '/pageOne', component: 'page-one' },
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

  render() {
    return html`
      <header>
        <mwc-tab-bar>
          <mwc-tab label="Inicio" @click=${() => this.switchRoute('')}></mwc-tab>
          <mwc-tab label="Productos" @click=${() => this.switchRoute('pageOne')}></mwc-tab>
          <mwc-tab label="Contacto" @click=${() => this.switchRoute('')}></mwc-tab>
        </mwc-tab-bar>
      </header>

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

        header ul {
          display: flex;
          justify-content: space-between;
          min-width: 400px;
          margin: 0 auto;
          padding: 0;
        }

        header ul li {
          display: flex;
        }

        header ul li a {
          color: #ccc;
          text-decoration: none;
          font-size: 18px;
          line-height: 36px;
        }

        header ul li a:hover,
        header ul li a.active {
          color: #000;
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
