import { html, css, LitElement, customElement, property } from 'lit-element';

import '@material/mwc-icon';

@customElement('card-producto')
export class CardProducto extends LitElement {
  @property() id: string;
  @property() name: string;
  @property() description: string;
  @property({ type: Boolean }) showDeleteButton;

  render() {
    return html`
      <div>
        <mwc-icon class="picture">insert_photo</mwc-icon>
        <h3>${this.name}</h3>

        ${this.showDeleteButton
          ? html`
              <mwc-icon
                class="delete"
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent('delete-product-clicked', { detail: this.id }),
                  )}
                >delete</mwc-icon
              >
            `
          : ''}
        <p>${this.description}</p>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        text-align: left;
      }

      div {
        background-color: white;
        border-radius: 8px;
        box-shadow: 4px 4px 10px black, -1px -1px 5px black;
      }

      div .picture {
        display: inline;
        --mdc-icon-size: 64px;
      }

      div h3 {
        display: inline;
      }

      div .delete {
        color: #009688;
        --mdc-icon-size: 32px;
        float: right;
        margin-right: 10px;
        margin-top: 10px;
      }

      div .delete:hover {
        cursor: pointer;
      }

      div p {
        padding-left: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
      }
    `;
  }
}
