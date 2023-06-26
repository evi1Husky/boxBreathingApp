"use strict";
class Timer {
    constructor() {
        this.t1 = 0;
        this.t2 = 0;
        this.interval = 0;
        this.phaseTime = 4;
        this.phaseNum = 1;
        this.seconds = this.phaseTime;
        this.tZero = this.seconds;
    }
    timer() {
        this.t2 = performance.now();
        const time = this.tZero + ((this.t1 - this.t2) / 1000) << 0;
        this.seconds = time - ((time / 60) << 0) * 60;
        if (this.seconds <= 0) {
            this.seconds = this.tZero;
            this.t1 = performance.now();
            this.phaseNum += 1;
            if (this.phaseNum > 4) {
                this.phaseNum = 1;
            }
        }
        postMessage(this.phaseNum);
    }
    start() {
        postMessage(this.phaseNum);
        this.t1 = performance.now();
        this.interval = setInterval(() => this.timer(), 990);
    }
}
self.onmessage = function () {
    const timer = new Timer();
    timer.start();
};
