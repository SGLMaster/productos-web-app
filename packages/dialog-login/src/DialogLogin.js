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

  close() {
    this.shadowRoot.querySelector('mwc-dialog').open = false;
  }

  async loginToApi() {
    const requestBody = { username: "willians", password: "wwog567"}

    const response = await fetch('https://ancient-mesa-25039.herokuapp.com/users/login', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {'Content-Type': 'application/json'}
    })
    const {token} = await response.json();

    if (token) {
      this.dispatchEvent(new CustomEvent('login-success', { detail: token }));
    }

    this.close();
  }

  render() {
    return html`
      <mwc-dialog title="Ingreso">
        <div>
          Por favor ingrese sus datos si desea acceder:
        </div><br>
        <mwc-textfield label="Usuario" dialogInitialFocus></mwc-textfield><br><br>
        <mwc-textfield label="Contraseña"></mwc-textfield>
        <mwc-button slot="primaryAction" @click=${this.loginToApi}>Ingresar</mwc-button>
      </mwc-dialog>
    `;
  }
}
