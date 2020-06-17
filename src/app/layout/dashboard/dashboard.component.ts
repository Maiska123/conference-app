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
  meetingReload: boolean;
  timeOut: Date;

  receivedChildMessage: boolean;

  private clockSubscription: Subscription;
  private meetingSubscription: Subscription;

  allMeetings: Meeting[];
  public meetingInProgress = false;

  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService) { }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeetings => {
      this.allMeetings = currentMeetings;
      this.meeting = currentMeetings[0];
    });

    this.clockSubscription = this.clockService.getTime().subscribe(time => {
      this.timeOut = time;
    });
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }

  nextMeeting(event: boolean) {
    this.receivedChildMessage = event;
    this.meetingInProgress = event;

    if ( this.meetingInProgress ){

      this.meetingReload = this.receivedChildMessage;

    } else { this.meetingReload = event;
             this.meeting = this.allMeetings[1];
            }
  }

}
