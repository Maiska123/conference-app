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

  // @Input() meetingData: Meeting;
  // @Input() meetingReload: boolean;
  @Input() TimeIn: Date;

  // tslint:disable-next-line: no-output-rename
  @Output('update') public nextMeeting: EventEmitter<boolean> = new EventEmitter<boolean>();
  // without true to event emitter 'ExpressionChangedAfterItHasBeenCheckedError' happens, with true looks ugly.

  receivedParentMessage: boolean;

  public meetings: Meeting[];
  public timerWidth;
  public timeLeft = 280;
  public indicatorLength = 450;
  public interval;
  public showMeeting = true;
  public currentMeetingInProgress: Meeting;
  private clockSubscription: Subscription;
  private meetingSubscription: Subscription;

  constructor(private meetingsService: MeetingsService) {

  }

  ngOnInit(): void {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeetings => {
      this.meetings = currentMeetings;
      this.currentMeetingInProgress = currentMeetings[0];
    });
  }

  ngOnChanges() {
    this.updateTimeLeft();
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }

  toggle(showMeet: boolean): void {
    (this.showMeeting) ?  this.showMeeting = showMeet : this.showMeeting = showMeet;
  }

  updateTimeLeft(){
    const end = new Date(this.currentMeetingInProgress?.EndTime).valueOf();
    const start = new Date(this.currentMeetingInProgress?.StartTime).valueOf();
    const current = new Date(this.TimeIn).valueOf();

    // IF current meeting is active
    if ( current > start  && current < end ){
    this.showMeeting = true;

    // Yellow indicator math
    const timePassed = ((1 - (current - start ) / (end - start )) * (this.indicatorLength));
    this.timeLeft = this.indicatorLength - timePassed;

    } else {
      if ( this.meetings !== undefined)
      {
        this.meetings.forEach(meeting => {
            const endNext = new Date(meeting?.EndTime).valueOf();
            const startNext = new Date(meeting?.StartTime).valueOf();
            const currentNext = new Date(this.TimeIn).valueOf();
            if ( currentNext > startNext  && currentNext < endNext ){
              this.currentMeetingInProgress = meeting;
              this.showMeeting = true;
            }
        });
      }
      this.showMeeting = false;
      this.timeLeft = this.indicatorLength;
      // this.nextMeeting.emit(this.showMeeting);
    }
  }

}
