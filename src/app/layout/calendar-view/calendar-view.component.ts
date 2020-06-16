import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { MeetingsService } from '../../services/meetings.service';
import { ClockService } from '../../services/clock.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav-details.service';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '100%',
        opacity: 1
      })),
      state('closed', style({
        width: '0%',
        opacity: 1
      })),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class CalendarViewComponent implements OnInit, OnDestroy{

  @Input() meetingData: Meeting;

  private clockSubscription: Subscription;
  public time: Date;
  public meetings: Meeting[];
  public meetingSubscription: Subscription;
  public showDetails = false;

  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService,
              private sidenavService: SidenavService) { }

  ngOnInit() {
    this.clockSubscription = this.clockService.getTime().subscribe(time => this.time = time);
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(freshMeetings => this.meetings = freshMeetings);
  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    this.meetingSubscription.unsubscribe();
  }

  toggleRightSidenav() {
    this.sidenavService.toggle();
  }

}
