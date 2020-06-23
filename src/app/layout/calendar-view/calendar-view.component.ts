import { Component, OnInit, Input, OnDestroy, ViewChild, OnChanges, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { MeetingsService } from '../../services/meetings.service';
import { ClockService } from '../../services/clock.service';
import { Subscription, BehaviorSubject } from 'rxjs';
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

export class CalendarViewComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit{



  constructor(private meetingsService: MeetingsService,
              private clockService: ClockService,
              private sidenavService: SidenavService) { }

  // @Input() meetingData: Meeting[];
  @Input() TimeIn: Date;

  private clockSubscription: Subscription;
  public time: Date;
  public meetings: Meeting[];
  public meetingSubscription: Subscription;
  public showDetails = false;
  public detailMeeting: Meeting;

  public runningTime = '0px';
  public meetingFromTop = '0px';

  secondsPerDay = 86400;
  threeHoursInSeconds = (3 * 3600);
  public meetingClicked: Meeting;

  fontSizeTiny = 15;
  fontSizeBig = 19;
  public meetingsBehaviour = new BehaviorSubject<Meeting>(null);

  // @ViewChild('MatGridList') timetableView: ElementRef;
  @ViewChild('myDiv', {read: ElementRef, static: false}) myDiv: ElementRef;
  @ViewChild('slide', {read: ElementRef, static: false}) slides: ElementRef;
  heightOfTimetable: any;
  contentHeight: string;
  contentHeightNumber = 2544;

  scrollToViewCount = 0;

  displayedColumns: string[] = ['subject', 'organizer', 'weight', 'symbol']; // bloat

  stylesObjOld = {
    cursor: 'pointer',
    position: 'absolute',
    'font-size': '1.1em',
    color: 'black',
    overflow: 'hidden',
    'font-family': 'Lato',
    // 'margin-top': '200px',
    'max-width': '20vw',
    width: '-webkit-fill-available',
    'border-left-width': '1vw',
    'border-left-color': 'yellow',
    'border-left-style': 'solid',
    'box-shadow': '3px 6px 20px 0px rgba(0,0,0,0.2)',
    'background-color': 'white',
    padding: '1vw',
  };


  // 1 hour is 100px height => 1min = 1.66px, 1s = 0.0277px ^ actually 106px
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

  @HostListener('scroll', ['$event']) // for window scroll events
  onScroll($event){
    console.log('onScroll! count is 0 again');
    this.scrollToViewCount = 0;
  }

  animate() {
    this.slides.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  emptyCount() {
    this.scrollToViewCount = 0;
  }


  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings().subscribe(currentMeetings => {
      this.meetings = currentMeetings;
    });

    this.clockSubscription = this.clockService.getTime()
    .subscribe(time => {
      this.time = time;
      ++this.scrollToViewCount;
      if (this.scrollToViewCount > 15 ){
        this.animate();
        this.scrollToViewCount = 0;
      }
      // running time is the amount of pixels from the top of the timetable, getTime() gives UTC seconds from 1970...
      this.runningTime = Math.round((((time.getTime()  / 1000) ) % this.secondsPerDay)
                                    * ((this.heightOfTimetable) / this.secondsPerDay))
                                    + 319 + 'px' ;

    });

  }

  ngAfterViewInit(){
    // console.log('divheight: ' + this.myDiv.nativeElement.offsetHeight); // <-- WORKS!
    this.heightOfTimetable = this.myDiv.nativeElement.offsetHeight;

  }


  getplacement(meeting){
    let top = '0px';
    const meetingDateTime = new Date(meeting.StartTime);

    // console.log('meetingss: ' + meeting.StartTime);
    // console.log('meetingss: ' + meetingDateTime.getTime());

    top = Math.round(Math.round((((meetingDateTime.getTime() / 1000) ) % this.secondsPerDay)
      * ((this.heightOfTimetable) / this.secondsPerDay)))
       + 'px';

    // console.log('meetingss: ' + top);

    return top;
  }

  getDuration(meeting){
    let height = '0px';

    const startTime = new Date (meeting.StartTime);
    const endTime = new Date (meeting.EndTime);
    const differenceInTime = (endTime.getTime() - startTime.getTime()) / 1000;
    // console.log('for: ' + meeting.Subject );
    // console.log('difference: ' + differenceInTime);
    height = (this.heightOfTimetable / this.secondsPerDay) * differenceInTime + 'px';

    return height;
  }

  getFontSize(meeting){
    let height = 0;

    const startTime = new Date (meeting.StartTime);
    const endTime = new Date (meeting.EndTime);
    const differenceInTime = (endTime.getTime() - startTime.getTime()) / 1000;
    // console.log('for: ' + meeting.Subject );
    // console.log('difference: ' + differenceInTime);
    // Font-size is calculated from meeting lenght
    height = Math.round(((this.heightOfTimetable / this.secondsPerDay) * differenceInTime) / 6) ;
    // height = 18px from 1h and 9px from 30min

    height < 18 ? height = this.fontSizeTiny : height = this.fontSizeBig;
    return height + 'px';
  }

  ngOnChanges() {

  }

  ngOnDestroy(): void {
    this.clockSubscription.unsubscribe();
  }

  toggleRightSidenav() {
    this.sidenavService.toggle();
    this.sidenavService.open();
    this.showDetails = true;
  }

  showDetailFunc(i: number){
    // this.detailMeeting = this.meetings[i];
    this.meetingsBehaviour.next(this.meetingClicked);
    this.toggleRightSidenav();
    this.showDetails = true;
  }


  showDetailsBehaviour(meeting: Meeting){
    this.showDetails = true;
    this.meetingClicked = meeting;
    this.detailMeeting = meeting;
    this.meetingsBehaviour.next(meeting);
    this.toggleRightSidenav();
  }

}
