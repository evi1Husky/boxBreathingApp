"use strict";
class Light extends HTMLElement {
    constructor() {
        var _a;
        super();
        this.width = 70;
        this.height = 70;
        this.phaseNum = 1;
        this.counter = 0;
        this.counter2 = 0;
        const template = document.createElement("template");
        template.innerHTML = `
      <style>
      :host {
        --shadowVal1: 50px;
        --shadowVal2: 15px;
        --brightness: 1;
        --blur: 0.5px;
        --width: 70px;
        --height: 70px;
      }

      .light {
        position: sticky;
        top: 50%;
        left: 50%;
        width: var(--width);
        height: var(--height);
        border-radius: 50%;
        will-change: background-color;
        will-change: box-shadow;
        will-change: width;
        will-change: height;
        background-color: rgba(187, 230, 255, var(--brightness));
        box-shadow: 0 0 var(--shadowVal1) var(--shadowVal2) rgba(187, 230, 255, 1);
        filter: blur(var(--blur));
      }
      </style>
        <div class="light"></div>`;
        this.attachShadow({ mode: "open" });
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template.content.cloneNode(true));
        this.timerWorker = new Worker("timer-worker.js");
        this.glowSize = 15;
        this.brightness = 1;
        this.maxBrightness = false;
        this.minBrightness = false;
    }
    connectedCallback() {
        this.timerWorker.postMessage("");
        this.lightAnimation();
    }
    lightAnimation() {
        window.requestAnimationFrame(this.lightAnimation.bind(this));
        this.timerWorker.onmessage = (e) => {
            this.phaseNum = e.data;
        };
        if (this.phaseNum === 1) {
            this.glowSize += 0.1;
            this.width += 0.6;
            this.height += 0.6;
        }
        else if (this.phaseNum === 3) {
            this.glowSize -= 0.1;
            this.width -= 0.6;
            this.height -= 0.6;
        }
        if (this.phaseNum === 2 || this.phaseNum === 4) {
            this.lightBump();
        }
        this.changeBrightness();
        this.style.setProperty("--shadowVal1", `${this.glowSize * 3.5}px`);
        this.style.setProperty("--shadowVal2", `${this.glowSize}px`);
        this.style.setProperty("--brightness", `${this.brightness}`);
        this.style.setProperty("--blur", `${this.brightness - 0.55}px`);
        this.style.setProperty("--width", `${this.width}px`);
        this.style.setProperty("--height", `${this.height}px`);
    }
    changeBrightness() {
        if (this.brightness < 1 && !this.maxBrightness) {
            this.brightness += 0.006;
            this.glowSize += 0.05;
            if (this.brightness >= 1) {
                this.maxBrightness = true;
                this.minBrightness = false;
            }
        }
        else if (this.brightness > 0.85 && !this.minBrightness) {
            this.brightness -= 0.006;
            this.glowSize -= 0.05;
            if (this.brightness <= 0.85) {
                this.maxBrightness = false;
                this.minBrightness = true;
            }
        }
    }
    lightBump() {
        const animation = window.requestAnimationFrame(this.lightBump.bind(this));
        if (this.counter >= 15 && this.counter2 >= 60) {
            window.cancelAnimationFrame(animation);
            setTimeout(() => {
                this.counter = 0;
                this.counter2 = 0;
            }, 4000);
            return;
        }
        if (this.counter < 15) {
            if (this.phaseNum === 2) {
                this.width += 0.4;
                this.height += 0.4;
            }
            else {
                this.width -= 0.4;
                this.height -= 0.4;
            }
            this.counter++;
        }
        else if (this.counter >= 15 && this.counter2 < 60) {
            if (this.phaseNum === 2) {
                this.width -= 0.1;
                this.height -= 0.1;
            }
            else {
                this.width += 0.1;
                this.height += 0.1;
            }
            this.counter2++;
        }
    }
}
customElements.define('light-component', Light);
