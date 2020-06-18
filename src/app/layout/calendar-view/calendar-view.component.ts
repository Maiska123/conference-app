import { Component, OnInit, Input, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { MeetingsService } from '../../services/meetings.service';
import { ClockService } from '../../services/clock.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav-details.service';
import { TimeTile } from '../../interfaces/timeTiles.interface';


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
export class CalendarViewComponent implements OnInit, OnDestroy, OnChanges{


  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService,
              private sidenavService: SidenavService) { }

  @Input() meetingData: Meeting;
  @Input() TimeIn: Date;

  private clockSubscription: Subscription;
  public time: Date;
  public meetings: Meeting[];
  public meetingSubscription: Subscription;
  public showDetails = false;


  displayedColumns: string[] = ['subject', 'organizer', 'weight', 'symbol'];

  stylesObj = {
    'font-size': '1.1em',
    color: 'black',
    'font-family': 'Lato',
    'margin-top': '200px',
    top: '3vh',
    'max-width': '70%',
    width: '-webkit-fill-available',
    'border-left-width': '1vw',
    'border-left-color': 'yellow',
    'border-left-style': 'solid',
    'box-shadow': '3px 6px 20px 0px rgba(0,0,0,0.2)',
    'background-color': 'white',
    left: '2.3vw',
    padding: '1vw',
  };


  // 1 hour is 100px height => 1min = 1.66px, 1s = 0.0277px ^
  timeTiles: TimeTile[] = [
    {text: '00:00', cols: 1, rows: 1},
    {text: '01:00', cols: 1, rows: 1},
    {text: '02:00', cols: 1, rows: 1},
    {text: '03:00', cols: 1, rows: 1},
    {text: '03:00', cols: 1, rows: 1},
    {text: '04:00', cols: 1, rows: 1},
    {text: '05:00', cols: 1, rows: 1},
    {text: '06:00', cols: 1, rows: 1},
    {text: '07:00', cols: 1, rows: 1},
    {text: '08:00', cols: 1, rows: 1},
    {text: '09:00', cols: 1, rows: 1},
    {text: '10:00', cols: 1, rows: 1},
    {text: '11:00', cols: 1, rows: 1},
    {text: '12:00', cols: 1, rows: 1},
    {text: '13:00', cols: 1, rows: 1},
    {text: '14:00', cols: 1, rows: 1},
    {text: '15:00', cols: 1, rows: 1},
    {text: '16:00', cols: 1, rows: 1},
    {text: '17:00', cols: 1, rows: 1},
    {text: '18:00', cols: 1, rows: 1},
    {text: '19:00', cols: 1, rows: 1},
    {text: '20:00', cols: 1, rows: 1},
    {text: '21:00', cols: 1, rows: 1},
    {text: '22:00', cols: 1, rows: 1},
    {text: '23:00', cols: 1, rows: 1},
  ];

  ngOnInit() {

    this.clockSubscription = this.clockService.getTime()
    .subscribe(time => {
      this.time = time;
    });

    this.meetingSubscription = this.meetingsService.getMeetings()
    .subscribe(freshMeetings => {
      this.meetings = freshMeetings;
    });
  }

  ngOnChanges() {

  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
    this.meetingSubscription.unsubscribe();
  }

  toggleRightSidenav() {
    this.sidenavService.toggle();
  }


}
