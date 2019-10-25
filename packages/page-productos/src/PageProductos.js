import { html, css, LitElement } from 'lit-element';

export class PageProductos extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
    };
  }

  render() {
    return html`
      <h1>Productos</h1>
    `;
  }
}
