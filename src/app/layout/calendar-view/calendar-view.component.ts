import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { MeetingsService } from '../../services/meetings.service';
import { ClockService } from '../../services/clock.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit, OnDestroy{

  @Input() meetingData: Meeting;

  private clockSubscription: Subscription;
  public time: Date;
  public meetings: Meeting[];
  public meetingSubscription: Subscription;

  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService) { }

  ngOnInit() {
    this.clockSubscription = this.clockService.getTime().subscribe(time => this.time = time);
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(freshMeetings => this.meetings = freshMeetings);
  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    this.meetingSubscription.unsubscribe();
  }

}
