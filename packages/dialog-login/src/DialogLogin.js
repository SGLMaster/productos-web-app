import { html, LitElement } from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';

export class DialogLogin extends LitElement {
  static get properties() {
    return {
    };
  }

  open() {
    this.shadowRoot.querySelector('mwc-dialog').open = true;
  }

  render() {
    return html`
      <mwc-dialog title="Ingreso">
        <div>
          Por favor ingrese sus datos si desea acceder:
        </div><br>
        <mwc-textfield label="Usuario" dialogInitialFocus></mwc-textfield><br><br>
        <mwc-textfield label="Contraseña"></mwc-textfield>
        <mwc-button slot="primaryAction" dialogAction="loginUser">Ingresar</mwc-button>
      </mwc-dialog>
    `;
  }
}
