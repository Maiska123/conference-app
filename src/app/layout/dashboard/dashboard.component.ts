import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';
import { SidenavService } from '../../services/sidenav-details.service';
import { ClockService } from '../../services/clock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  /* URL PARAMS */
  roomId: number;
  private roomIdSub: any;

  /* TO OUT */
  meeting: Meeting;
  meetingReload = false;
  timeOut: Date;
  roomIdOut: number;
  meetingsData: Meeting[];

  currentMeeting = 1;
  receivedChildMessage: boolean;

  private clockSubscription: Subscription;

  allMeetings: Meeting[];
  public meetingInProgress = false;

  constructor(private clockService: ClockService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.clockSubscription = this.clockService.getTime().subscribe(time => {
      this.timeOut = time;
    });

    this.roomIdSub = this.route.params.subscribe(params => {
      this.roomIdOut = params.roomId; // string 'roomId' to a number
    });
  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    this.roomIdSub.unsubscribe();
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
