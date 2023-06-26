class StartButton extends HTMLElement {
  start: HTMLElement
  background: HTMLBodyElement

  constructor() {
    super()
    const template = document.createElement("template")
    template.innerHTML = `
      <style>
      :host {
      }

      #start {
        width: 8rem;
        height: 6rem;
        background: rgb(255 219 219);
        margin-top: 4rem;
        text-align: center;
        line-height: 6rem;
        font-size: 3rem;
        color: rgb(35, 40, 47);
        border-radius: 1rem;
        user-select: none;
      }

      </style>
        <div id="start">></div>`

    this.attachShadow({ mode: "open" })
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
    this.start = this.shadowRoot?.getElementById("start")!
    this.background = document.querySelector("body") as HTMLBodyElement
  }

  static get observedAttributes() {
    return ['selection']
  }

  attributeChangedCallback() {

  }

  connectedCallback() {
    this.start.onclick = () => {
      container.innerHTML = ""
      this.background.style.background = "black"
      setTimeout(() => {
        switch (this.getAttribute("selection")) {
          case "box":
            container.appendChild(document.createElement("box-component") as Box)
            break;
          case "circle":
            container.appendChild(document.createElement("light-component") as Light)
            break;
        }
      }, 700);
    }

    this.start.onmouseover = () => {
      this.start.style.background = "rgb(255 205 205)"
    }

    this.start.onmouseleave = () => {
      this.start.style.background = "rgb(255 219 219)"
    }
  }
}

customElements.define("start-button", StartButton)