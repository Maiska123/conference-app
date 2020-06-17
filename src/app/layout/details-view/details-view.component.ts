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
        opacity: 0
      })),
      state('closed', style({
        opacity: 1
      })),
      transition('* => closed', [
        animate('0.2s ease')
      ]),
      transition('* => *', [
        animate('0.3s ease')
      ]),
    ]),
    trigger('arrow', [
      // ...
      state('open', style({
        opacity: 0,
        transform: 'translate(50%, 50%) rotate(90deg)'
      })),
      state('closed', style({
        opacity: 1,
        transform: 'translate(0%, 0%) rotate(0deg)'
      })),
      transition('* => *', [
        animate('0.3s ease')
      ]),
      transition('open => closed', [
        animate('0.2s ease')
      ]),
    ])
  ],
})
export class DetailsViewComponent implements OnInit, OnDestroy, AfterViewInit {

  // @Input() meetingData: Meeting;
  @Input() meetingData: Meeting;
  @Input() public toggleActive = false;

  @ViewChild('rightSidenav') public sidenav: MatSidenav;


  panelOpenState = false;

  public meetingDataOld: Meeting;
  public meetingSubscription: Subscription;
  // public toggleActive = false;
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
