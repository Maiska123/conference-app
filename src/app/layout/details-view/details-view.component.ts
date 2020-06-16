import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css']
})
export class DetailsViewComponent implements OnInit, OnDestroy {

  // @Input() meetingData: Meeting;

  panelOpenState = true;
  public meetingData: Meeting;
  public meetingSubscription: Subscription;

  constructor(
    private meetingsService: MeetingsService
    ) { }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(freshMeetings => this.meetingData = freshMeetings[0]);
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }


}
