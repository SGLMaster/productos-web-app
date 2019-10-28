import { html, css, LitElement } from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-button';

export class DialogAgregarProducto extends LitElement {
  static get properties() {
    return {
      errorMsg: { type: String },
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
  }

  open() {
    this.shadowRoot.querySelector('mwc-dialog').open = true;
  }

  close() {
    this.shadowRoot.querySelector('mwc-dialog').open = false;
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
        <mwc-button slot="primaryAction">
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
