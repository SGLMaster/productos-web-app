import { html, css, LitElement } from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-textfield';
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
      <mwc-dialog title="Ingreso">
        <div>
          Por favor ingrese sus datos si desea acceder:
        </div>
        <br />
        <mwc-textfield label="Usuario" dialogInitialFocus></mwc-textfield>
        <br /><br />
        <mwc-textfield label="Contraseña" type="password"></mwc-textfield>
        <mwc-button slot="primaryAction">
          Ingresar
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
