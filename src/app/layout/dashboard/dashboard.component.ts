import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';
import { SidenavService } from '../../services/sidenav-details.service';
import { ClockService } from '../../services/clock.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  /* TO OUT */
  meeting: Meeting;
  meetingReload = false;
  timeOut: Date;
  meetingsData: Meeting[];

  currentMeeting = 1;
  receivedChildMessage: boolean;

  private clockSubscription: Subscription;

  allMeetings: Meeting[];
  public meetingInProgress = false;

  constructor(private clockService: ClockService) { }

  ngOnInit() {
    this.clockSubscription = this.clockService.getTime().subscribe(time => {
      this.timeOut = time;
    });
  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
  }

  nextMeeting(event: boolean) {

    this.receivedChildMessage = event;
    this.meetingInProgress = event;

    if ( this.meetingInProgress ){

      this.meetingReload = this.receivedChildMessage;

    }
    else {

      if ( this.allMeetings !== undefined)
      {
          this.meetingReload = event;
          this.currentMeeting = --this.currentMeeting;
          this.meeting = this.allMeetings[this.currentMeeting];
          this.allMeetings.pop();
      }

    }
  }

}
