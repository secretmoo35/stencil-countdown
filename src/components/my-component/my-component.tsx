import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'counter-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop({ reflectToAttr: true }) second: number;
  @State() value: number;
  countdownSetInterval;
  onStart() {
    this.countdownSetInterval = setInterval(() => {
      this.value -= 1;
      if (this.value <= 0) {
        clearInterval(this.countdownSetInterval);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.countdownSetInterval);
  }

  onContinue() {
    this.onStart();
  }

  onClear() {
    clearInterval(this.countdownSetInterval);
    this.second = 0;
    this.value = 0;
  }

  handleChange(event) {
    this.value = event.target.value;
  }

  componentWillLoad() {
    this.value = this.second;
  }

  render() {
    return ([
      <div class="content">
        <div>
          <p>ระบุจำนวนวินาที</p>
          <input type="number" value={this.second} onInput={(event) => this.handleChange(event)} />
        </div>
        <div class="btn">
          <button onClick={() => { this.onStart() }}>เริ่ม</button>
          <button onClick={() => { this.onStop() }}>หยุด</button>
          <button onClick={() => { this.onContinue() }}>ทำต่อ</button>
          <button onClick={() => { this.onClear() }}>เริ่มใหม่</button>
        </div>
        <div>
          <h1>{this.value}</h1>
        </div>
      </div>
    ]);
  }
}

