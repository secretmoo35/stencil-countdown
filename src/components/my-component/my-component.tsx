import { Component, State } from '@stencil/core';

@Component({
  tag: 'counter-component',
  styleUrl: 'my-component.css',
  // shadow: true
})
export class MyComponent {
  @State() value: number;
  second: number;
  count: number;
  countdownSetInterval;


  onStart() {
    this.countdownSetInterval = setInterval(() => {
      this.count--;
      this.value = this.count;
      if (this.value <= 0) {
        clearInterval(this.countdownSetInterval);
        this.componentDidLoad();
        document.getElementById('input').style.visibility = 'visible';
      }
    }, 1000);

    document.getElementById('input').style.visibility = 'hidden';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('stop').style.visibility = 'visible';
    document.getElementById('continue').style.visibility = 'hidden';
    document.getElementById('clear').style.visibility = 'hidden';
  }

  onStop() {
    clearInterval(this.countdownSetInterval);

    document.getElementById('input').style.visibility = 'visible';
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('stop').style.visibility = 'hidden';
    document.getElementById('continue').style.visibility = 'visible';
    document.getElementById('clear').style.visibility = 'visible';
  }

  onContinue() {
    this.onStart();

    // document.getElementById('start').style.visibility = 'hidden';
    // document.getElementById('stop').style.visibility = 'visible';
    // document.getElementById('continue').style.visibility = 'hidden';
    // document.getElementById('clear').style.visibility = 'hidden';
  }

  onClear() {
    clearInterval(this.countdownSetInterval);
    this.value = 0;
    this.second = 0;
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('stop').style.visibility = 'hidden';
    document.getElementById('continue').style.visibility = 'hidden';
    document.getElementById('clear').style.visibility = 'hidden';
  }

  handleChange(event) {
    this.count = event.target.value;

    if (this.count > 0) {
      document.getElementById('start').style.visibility = 'visible';
    } else {
      document.getElementById('start').style.visibility = 'hidden';
    }
  }

  componentDidLoad() {

    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('stop').style.visibility = 'hidden';
    document.getElementById('continue').style.visibility = 'hidden';
    document.getElementById('clear').style.visibility = 'hidden';

    if (this.count > 0) {
      document.getElementById('start').style.visibility = 'visible';
    } else {
      document.getElementById('start').style.visibility = 'hidden';
    }
  }

  render() {
    return ([
      <div class="content">
        <div>
          <p>ระบุจำนวนวินาที</p>
          <input id="input" type="number" value={this.second} onInput={(e) => this.handleChange(e)} />
        </div>
        <div class="btn">
          <button id="start" onClick={() => { this.onStart() }}>เริ่ม</button>
          <button id="stop" onClick={() => { this.onStop() }}>หยุด</button>
          <button id="continue" onClick={() => { this.onContinue() }}>ทำต่อ</button>
          <button id="clear" onClick={() => { this.onClear() }}>เริ่มใหม่</button>
        </div>
        <div>
          <h1>{this.value}</h1>
        </div>
      </div>
    ]);
  }
}

