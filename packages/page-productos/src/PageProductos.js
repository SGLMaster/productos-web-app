import { html, css, LitElement } from 'lit-element';

export class PageProductos extends LitElement {
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
    };
  }

  constructor() {
    super();
    this.products = [];
  }

  async fetchProducts() {
    const response = await fetch('https://ancient-mesa-25039.herokuapp.com/productos?filter[limit]=10',{
      method: 'GET',
      headers:{ 'Content-Type': 'application/json' }
    });
    this.products = await response.json();
  }

  firstUpdated() {
    this.fetchProducts();
  }

  render() {
    return html`
      <h1>Productos</h1>
      <ul>
        ${this.products.map((product) => html`
          <li>${product.nombre}
            <div>${product.desc}</div>
          </li><br>
        `)}
      </ul>
    `;
  }
}
