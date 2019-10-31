var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement, customElement, property } from 'lit-element';
import '@material/mwc-icon';
let CardProducto = class CardProducto extends LitElement {
    render() {
        return html `
      <div>
        <mwc-icon class="picture">insert_photo</mwc-icon>
        <h3>${this.name}</h3>
        <mwc-icon
          class="delete"
          @click=${() => this.dispatchEvent(new CustomEvent('delete-product-clicked', { detail: this.id }))}
          >delete</mwc-icon
        >
        <p>${this.description}</p>
      </div>
    `;
    }
    static get styles() {
        return css `
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
};
__decorate([
    property()
], CardProducto.prototype, "id", void 0);
__decorate([
    property()
], CardProducto.prototype, "name", void 0);
__decorate([
    property()
], CardProducto.prototype, "description", void 0);
CardProducto = __decorate([
    customElement('card-producto')
], CardProducto);
export { CardProducto };
