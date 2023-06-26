"use strict";
class BoxInstructions extends HTMLElement {
    constructor() {
        var _a;
        super();
        const template = document.createElement("template");
        template.innerHTML = `
      <style>
      :host {
      }

      #box {
        width: 16rem;
        height: 16rem;
        border: solid rgb(255 248 213) 1.25rem;
        margin-bottom: 4rem;
        display: flex;
        flex-direction: column;
      }

      .arrow {
        font-size: 7rem;
        color: rgb(226 244 255);
        line-height: 3rem;
        user-select: none;
      }

      #left-right {
        display: flex;
        flex-direction: row;
        margin-top: auto;
        justify-content: space-between;
      }

      #arrow-top {
        line-height: 3.3rem;
        align-self: center;
  
      }

      #arrow-bottom {
        line-height: 3.3rem;
        transform: rotate(180deg);
        align-self: center;
        margin-top: auto;
      }

      #arrow-left {
        transform: rotate(270deg);
 
      }

      #arrow-right {
        transform: rotate(90deg);
      }

      #seconds {
        font-size: 4rem;
        color: rgb(255 219 219);
        margin: 0rem;
        user-select: none;
      }

      </style>
        <div id="box">
          <div id="arrow-top" class="arrow">➞</div>
          <div id="left-right">
            <div id="arrow-left" class="arrow">➞</div>
            <div id="seconds">4</div>
            <div id="arrow-right" class="arrow">➞</div>
          </div>
          <div id="arrow-bottom" class="arrow">➞</div>
        </div>`;
        this.attachShadow({ mode: "open" });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
    }
}
window.customElements.define("box-instructions", BoxInstructions);
