class Box extends HTMLElement {
  phaseNum: number = 0
  timerWorker: Worker

  box1: number = 0
  box2: number = 0
  box3: number = 0
  box4: number = 0
  box4bottom: number = 10

  brightness: number
  maxBrightness: boolean
  minBrightness: boolean

  constructor() {
    super()
    const template = document.createElement("template")
    template.innerHTML = `
      <style>
      :host {
        --box-1-width: 0%;
        --box-2-height: 0%;
        --box-3-width: 0%;
        --box-4-height: 0%;
        --box-4-bottom: 10%;
        --brightness: 1;
      }

      .box-container {
        width: 250px;
        height: 250px;
        overflow: hidden;
      }

      .box {
        will-change: background-color;
        will-change: box-shadow;
        will-change: width;
        will-change: height;
        background-color: rgba(187, 230, 255, var(--brightness));
        position: relative;
      }

      #box-1 {
        width: var(--box-1-width);
        height: 25px;
      }

      #box-2 {
        width: 25px;
        height: var(--box-2-height);
        left: 90%;
      }

      #box-3 {
        width: var(--box-3-width);
        height: 25px;
        float: right;
        bottom: 25px;
        right: 25px;
      }

      #box-4 {
        width: 25px;
        height: var(--box-4-height);
        bottom: var(--box-4-bottom);
      }
    
      </style>
        <div class="box-container">
          <div class="box" id="box-1"></div>
          <div class="box" id="box-2"></div>
          <div class="box" id="box-3"></div>
          <div class="box" id="box-4"></div>
        </div>`

    this.attachShadow({ mode: "open" })
    this.shadowRoot?.appendChild(template.content.cloneNode(true))

    this.timerWorker = new Worker("timer-worker.js");

    this.brightness = 1
    this.maxBrightness = false
    this.minBrightness = false
  }

  connectedCallback() {
    this.timerWorker.postMessage("")
    this.boxAnimation()
  }

  boxAnimation() {
    const animation = window.requestAnimationFrame(this.boxAnimation.bind(this))

    this.timerWorker.onmessage = (e) => {
      this.phaseNum = e.data
    }

    if (this.phaseNum === 1) {
      this.box1 += 0.60
    } else if (this.phaseNum === 2) {
      this.box1 = 100
      this.box2 += 0.40
    } else if (this.phaseNum === 3) {
      this.box2 = 90
      this.box3 += 0.40
    } else if (this.phaseNum === 4) {
      this.box3 = 90
      this.box4 += 0.50
      this.box4bottom += 0.50
    }

    if (this.box4 >= 80.5) {
      setTimeout(() => {
        this.timerWorker.terminate()
        container.innerHTML = ""
        container.appendChild(document.createElement("box-component") as Box)
      }, 500)

      window.cancelAnimationFrame(animation)
      return
    }

    this.changeBrightness()

    this.style.setProperty("--box-1-width", `${this.box1}%`)
    this.style.setProperty("--box-2-height", `${this.box2}%`)
    this.style.setProperty("--box-3-width", `${this.box3}%`)
    this.style.setProperty("--box-4-height", `${this.box4}%`)
    this.style.setProperty("--box-4-bottom", `${this.box4bottom}%`)
    this.style.setProperty("--brightness", `${this.brightness}`)
  }

  changeBrightness() {
    if (this.brightness < 1 && !this.maxBrightness) {
      this.brightness += 0.006
      if (this.brightness >= 1) {
        this.maxBrightness = true
        this.minBrightness = false
      }
    } else if (this.brightness > 0.85 && !this.minBrightness) {
      this.brightness -= 0.006
      if (this.brightness <= 0.85) {
        this.maxBrightness = false
        this.minBrightness = true
      }
    }
  }
}

customElements.define('box-component', Box)