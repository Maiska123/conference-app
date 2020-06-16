import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{


  @Output() public meetingSubscription: Subscription;

  meeting: Meeting[];

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeeting => this.meeting = currentMeeting);
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }
}
