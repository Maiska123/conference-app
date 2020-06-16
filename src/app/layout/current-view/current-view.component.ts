import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MeetingsService } from '../../services/meetings.service';
import { Meeting } from '../../interfaces/meeting.interface';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ClockService } from '../../services/clock.service';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-current-view',
  templateUrl: './current-view.component.html',
  styleUrls: ['./current-view.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,

      })),
      state('closed', style({
        opacity: 0.0,

      })),
      transition('* => closed', [
        animate('1s ease-in')
      ]),
      transition('* => open', [
        animate('1.5s ease-out')
      ]),
      // transition('open <=> closed', [
      //   animate('0.5s')
      // ]),

    ]),
    trigger('flyInOut', [
      state('open', style({
        transform: 'translateY(-5vh)'
      })),
      state('closed', style({
        transform: 'translateY(15vh)'
       })),
      transition('* => *', [
        animate('1.5s ease')
      ])
    ])
  ],
})
export class CurrentViewComponent implements OnInit, OnDestroy {

  @Input() meetingData: Meeting;

  public meetingDataIn: Meeting;

  public time: Date;
  public meetings: Meeting[];
  public timerWidth;
  public timeLeft = 280;
  public interval;
  public showMeeting = false;
  private clockSubscription: Subscription;
  private meetingSubscription: Subscription;

  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService) {

  }

  ngOnInit(): void {
    console.log(this.meetingData);

    this.clockSubscription = this.clockService.getTime().subscribe(time => {
     this.time = time;
     this.updateTimeLeft(); });
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(freshMeetings => this.meetings = freshMeetings);
  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    this.meetingSubscription.unsubscribe();
  }

  toggle(): void {

    // this.startTimer();
    (this.showMeeting) ?  this.showMeeting = false : this.showMeeting = true;
    this.updateTimeLeft();
  }

  updateTimeLeft(){
    const end = new Date(this.meetings[0].EndTime).valueOf();
    const start = new Date(this.meetings[0].StartTime).valueOf();
    const current = new Date(this.time).valueOf();

    if (current > start  && current < end){
      this.showMeeting = true;
      const timePassed = ((1 - (current - start ) / (end - start )) * (280));
      this.timeLeft = 280 - timePassed;
    } else { this.timeLeft = 280; this.showMeeting = false; }
  }

// startTimer() {
//     this.interval = setInterval(() => {
//       if (this.timeLeft < 280) {
//         this.timeLeft++;
//       } else {
//         console.log(this.now);
//         this.pauseTimer();
//         this.toggle();
//         this.timeLeft = 0;
//       }
//     }, 10 );
//   }

//   pauseTimer() {
//     clearInterval(this.interval);
//   }

}
