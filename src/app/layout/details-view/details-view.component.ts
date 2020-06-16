import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav-details.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('* => closed', [
        animate('1s ease')
      ]),
      transition('* => *', [
        animate('0.5s ease')
      ]),
    ]),
  ],
})
export class DetailsViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // @Input() meetingData: Meeting;
  @Input() meetingData: Meeting;

  @ViewChild('rightSidenav') public sidenav: MatSidenav;


  panelOpenState = false;

  public meetingDataOld: Meeting;
  public meetingSubscription: Subscription;
  public toggleActive = false;
  constructor(
    private meetingsService: MeetingsService,
    private sidenavService: SidenavService
    ) { }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(freshMeetings => this.meetingDataOld = freshMeetings[0]);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }

  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive ;
    this.sidenav.toggle();
  }

}
