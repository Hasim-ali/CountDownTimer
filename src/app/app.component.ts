import { Component, NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CountDownTimer';
  startDate: Date = new Date();
  endDate: Date = new Date();
  currDate: Date = new Date();
  remaningTime: any;
  countdown: number = 0;
  intervalId: any;
  // Inject the NgZone to ensure the countdown updates the view properly
  constructor(private ngZone: NgZone) { }
  startCountdown() {
    this.countdown = new Date(this.endDate).getTime();
    this.intervalId = setInterval(() => {
      var now = new Date().getTime();
      var diff = this.countdown - now;
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var sec = Math.floor((diff % (1000 * 60)) / 1000);
      this.updateRemainingTime(days, hours, min, sec);
      if (diff < 0) {
        clearInterval(this.intervalId);
        this.ngZone.run(() => {
          this.remaningTime = "expired";
        });
      }
    }, 1000);
  }

  updateRemainingTime(days: number, hours: number, min: number, sec: number) {
    this.ngZone.run(() => {
      this.remaningTime = `${days}d ${hours}h ${min}m ${sec}s`;
    });
  }

  getCurrentTime() {
    return new Date().toLocaleString();
  }
}
