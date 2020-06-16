import { Component, OnInit, ViewChild } from '@angular/core';

import { Meeting } from './interfaces/meeting.interface';
import { MeetingsService } from './services/meetings.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'conference-app';

  @ViewChild('rightSidenav') public sidenav: MatSidenav;

  constructor(private meetingsService: MeetingsService,
              private sidenavService: SidenavService) {}
  public meetings: Meeting[];

  getMeetings(): void {
    this.meetingsService.getMeetings()
    .subscribe(newMeetings => this.meetings = newMeetings);
  }

  ngOnInit() {
    this.getMeetings();
  }


}
