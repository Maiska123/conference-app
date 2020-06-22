import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MeetingsService } from '../../services/meetings.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav-details.service';
import { subscribeOn } from 'rxjs/operators';

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
        opacity: 1,
        // transform: 'translate(50%, 50%) rotate(90deg)'
      })),
      state('closed', style({
        opacity: 1,
        // transform: 'translate(0%, 0%) rotate(0deg)'
      })),
      transition('* => *', [
        animate('0.3s ease-in')
      ]),
      transition('open => closed', [
        animate('0.2s ease-in')
      ]),
    ])
  ],
})
export class DetailsViewComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  // @Input() meetingData: Meeting;
  @Input() meetingData: Meeting;
  // @Input() public
  @Input() public toggleActive: boolean;
  activeMeeting = new BehaviorSubject<any>(null);

  @ViewChild('rightSidenav') public sidenav: MatSidenav;


  panelOpenState = false;

  // public meetingSubscription: Subscription;
  // public toggleActive = false;
  constructor(
    // private meetingsService: MeetingsService,
    private sidenavService: SidenavService
    ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnChanges(meeting): void {
    this.activeMeeting.next(this.meetingData);
    // this.toggleActive = !this.toggleActive ;
    // this.toggleRightSidenav();
  }

  ngOnDestroy(): void {
    // this.meetingSubscription.unsubscribe();
  }

  toggleRightSidenav() {
    this.activeMeeting.next(this.meetingData);
    this.sidenav.toggle();
  }

}
