import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
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
        animate('0.5s ease-in')
      ]),
      transition('* => open', [
        animate('0.5s ease-out')
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
        animate('0.5s ease')
      ])
    ])
  ],
})
export class CurrentViewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() meetingData: Meeting;
  @Input() meetingReload: boolean;
  @Input() TimeIn: Date;

  // tslint:disable-next-line: no-output-rename
  @Output('update') public nextMeeting: EventEmitter<boolean> = new EventEmitter<boolean>();
  // without true to event emitter 'ExpressionChangedAfterItHasBeenCheckedError' happens, with true looks ugly.

  receivedParentMessage: boolean;

  public meetings: Meeting[];
  public timerWidth;
  public timeLeft = 280;
  public interval;
  public showMeeting = true;
  private clockSubscription: Subscription;
  private meetingSubscription: Subscription;

  constructor(private meetingsService: MeetingsService) {

  }

  ngOnInit(): void {

  //     this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeetings => {
  //       this.meetings = currentMeetings.reverse();
  //     });

  }

  ngOnChanges() {
    this.showMeeting = this.meetingReload;
    this.updateTimeLeft();
  }

  ngOnDestroy(): void {

  }

  toggle(showMeet: boolean): void {

    (this.showMeeting) ?  this.showMeeting = showMeet : this.showMeeting = showMeet;
  }

  updateTimeLeft(){

    const end = new Date(this.meetingData?.EndTime).valueOf();
    const start = new Date(this.meetingData?.StartTime).valueOf();
    const current = new Date(this.TimeIn).valueOf();

    if (current > start  && current < end){
      this.showMeeting = true;
      const timePassed = ((1 - (current - start ) / (end - start )) * (280));
      this.timeLeft = 280 - timePassed;

    } else { this.timeLeft = 280;
             this.showMeeting = false;
             this.nextMeeting.emit(this.showMeeting);
            }
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
