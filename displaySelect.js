"use strict";
class DisplaySelect extends HTMLElement {
    constructor() {
        var _a, _b, _c;
        super();
        const template = document.createElement("template");
        template.innerHTML = `
      <style>
      :host {
        --background-box: 1;
        --background-circle: 0;
      }

      .select-container {
        width: 27rem;
        height: 12rem;
        display: flex;
        justify-content: space-around;
      }

      #selection-box, #selection-circle {
        width: 12rem;
        height: 12rem;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #selection-box {
        background: rgba(53, 61, 70, var(--background-box));
        border: solid rgba(63, 71, 80, var(--background-box)) 0.5px;
      }

      #selection-circle {
        background: rgba(53, 61, 70, var(--background-circle));
        border: solid rgba(63, 71, 80, var(--background-circle)) 0.5px;
      }

      #box {
        width: 5rem;
        height: 5rem;
        border: solid rgba(187, 230, 255, 1) 1.3rem;
      }

      #circle {
        background: rgba(187, 230, 255, 1);
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 50%;
      }

      </style>
        <div class="select-container">
          <div id="selection-box">
            <div id="box"></div>
          </div>
          <div id="selection-circle">
            <div id="circle"></div>
          </div>
        </div>`;
        this.attachShadow({ mode: "open" });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));
        this.box = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById("box");
        this.circle = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById("circle");
        this.box.addEventListener("click", this.selectionCallback.bind(this));
        this.circle.addEventListener("click", this.selectionCallback.bind(this));
        this.startButton = document.createElement("start-button");
    }
    connectedCallback() {
        container.appendChild(this.startButton);
        this.startButton.setAttribute("selection", this.getAttribute("selection"));
    }
    static get observedAttributes() {
        return ['selection'];
    }
    attributeChangedCallback() {
        switch (this.getAttribute("selection")) {
            case "box":
                this.style.setProperty("--background-box", "1");
                this.style.setProperty("--background-circle", "0");
                break;
            case "circle":
                this.style.setProperty("--background-box", "0");
                this.style.setProperty("--background-circle", "1");
                break;
        }
        this.startButton.setAttribute("selection", this.getAttribute("selection"));
    }
    selectionCallback(event) {
        switch (event.target.id) {
            case "box":
                this.setAttribute("selection", "box");
                break;
            case "circle":
                this.setAttribute("selection", "circle");
                break;
        }
    }
}
customElements.define('display-select', DisplaySelect);
