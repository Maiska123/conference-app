import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';
import { SidenavService } from '../../services/sidenav-details.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{


  @Output() meeting: Meeting;

  public meetingSubscription: Subscription;

  allMeetings: Meeting[];


  constructor(private meetingsService: MeetingsService) { }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeetings => {
      this.allMeetings = currentMeetings;
      this.meeting = currentMeetings[0]; });
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }


}
