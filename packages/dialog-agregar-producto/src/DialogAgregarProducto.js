import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';

import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-button';

import { store } from '../../redux/store.js';

export class DialogAgregarProducto extends connect(store)(LitElement) {
  static get properties() {
    return {
      errorMsg: { type: String },
      token: { type: String },
    };
  }

  static get styles() {
    return css`
      .error-msg {
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.errorMsg = '';
    this.token = '';
  }

  open() {
    this.shadowRoot.querySelector('mwc-dialog').open = true;
  }

  close() {
    this.shadowRoot.querySelector('mwc-dialog').open = false;
  }

  async addProductToDb() {
    try {
      const textfields = this.shadowRoot.querySelectorAll('mwc-textfield');

      const nombre = textfields[0].value;
      const id = nombre
        .toLocaleLowerCase()
        .split(' ')
        .join('_');
      const desc = this.shadowRoot.querySelector('mwc-textarea').value;
      const cantidad = parseInt(textfields[1].value, 10);
      const peso = parseInt(textfields[2].value, 10);

      const requestBody = { id, nombre, desc, cantidad, peso };

      const response = await fetch('https://ancient-mesa-25039.herokuapp.com/productos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token}` },
      });
      const data = await response.json();

      const { error } = data;
      if (error) {
        throw error;
      }

      this.close();
    } catch (error) {
      this.errorMsg = error.message;
    }
  }

  stateChanged(state) {
    this.token = state.token;
  }

  render() {
    return html`
      <mwc-dialog title="Agregar Producto">
        <div>
          Ingrese los datos del producto a agregar:
        </div>
        <br />
        <mwc-textfield label="Nombre" dialogInitialFocus></mwc-textfield>
        <br /><br />
        <mwc-textarea label="Descripción" rows="5"></mwc-textarea>
        <br /><br />
        <mwc-textfield label="Cantidad" type="number"></mwc-textfield>
        <br /><br />
        <mwc-textfield label="Peso" type="number"></mwc-textfield>
        <br /><br />
        <mwc-button slot="primaryAction" @click=${this.addProductToDb}>
          Agregar
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel">
          Cancelar
        </mwc-button>
        ${this.errorMsg
          ? html`
              <div class="error-msg">${this.errorMsg}</div>
            `
          : ''}
      </mwc-dialog>
    `;
  }
}
