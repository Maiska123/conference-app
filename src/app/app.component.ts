import { Component, OnInit } from '@angular/core';

import { Meeting } from './interfaces/meeting.interface';
import { MeetingsService } from './services/meetings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'conference-app';
  constructor(private meetingsService: MeetingsService) {}
  public meetings: Meeting[];

  getMeetings(): void {
    this.meetingsService.getMeetings()
    .subscribe(newMeetings => this.meetings = newMeetings);
  }

  ngOnInit() {
    this.getMeetings();
  }


}
