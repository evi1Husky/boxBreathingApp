class Timer {
  seconds: number
  tZero: number
  t1: number = 0
  t2: number = 0
  interval: number = 0
  phaseTime: number = 4
  phaseNum: number = 1

  constructor() {
    this.seconds = this.phaseTime
    this.tZero = this.seconds
  }

  timer() {
    this.t2 = performance.now()
    const time: number = this.tZero + ((this.t1 - this.t2) / 1000) << 0
    this.seconds = time - ((time / 60) << 0) * 60
    if (this.seconds <= 0) {
      this.seconds = this.tZero
      this.t1 = performance.now()
      this.phaseNum += 1
      if (this.phaseNum > 4) {
        this.phaseNum = 1
      }
    }

    postMessage(this.phaseNum)
  }

  start() {
    postMessage(this.phaseNum)
    this.t1 = performance.now()
    this.interval = setInterval(() => this.timer(), 990)
  }
}

self.onmessage = function () {
  const timer: Timer = new Timer()
  timer.start()
}
