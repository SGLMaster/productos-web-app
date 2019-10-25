import { html, css, LitElement } from 'lit-element';

import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';

export class DialogLogin extends LitElement {
  static get properties() {
    return {
      errorMsg: { type: String }
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

  async loginToApi() {
    try {
      const textfields = this.shadowRoot.querySelectorAll('mwc-textfield');
      const user = textfields[0].value;
      const pass = textfields[1].value;

      const requestBody = { username: user, password: pass}

      const response = await fetch(
        'https://ancient-mesa-25039.herokuapp.com/users/login', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json();

      const {token} = data;

      if (token) {
        this.dispatchEvent(new CustomEvent('login-success',
          { detail: token }));
      }
      else {
        const {error} = data;
        throw error;
      }

      this.close();
    } catch (error) {
      this.errorMsg = error.message;
    }
  }

  render() {
    return html`
      <mwc-dialog title="Ingreso">
        <div>
          Por favor ingrese sus datos si desea acceder:
        </div><br>
        <mwc-textfield label="Usuario" dialogInitialFocus></mwc-textfield>
        <br><br>
        <mwc-textfield label="Contraseña" type="password"></mwc-textfield>
        <mwc-button slot="primaryAction" @click=${this.loginToApi}>
          Ingresar
        </mwc-button>
        ${
          this.errorMsg ? html`<div class="error-msg">${this.errorMsg}</div>`
          : ''
        }
      </mwc-dialog>
    `;
  }
}
