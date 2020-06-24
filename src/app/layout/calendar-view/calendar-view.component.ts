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

  timeTiles: TimeTile[] = [
    {text: '00:00', cols: 1, rows: 1},
    {text: '01:00', cols: 1, rows: 1},
    {text: '02:00', cols: 1, rows: 1},
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

  @ViewChild('myDiv', {read: ElementRef, static: false}) myDiv: ElementRef;
  @ViewChild('myAnotherDiv', {read: ElementRef, static: false}) myAnotherDiv: ElementRef;
  @ViewChild('slide', {read: ElementRef, static: false}) slides: ElementRef;
  heightOfTimetable: any;
  widthOfClocks: any;
  contentHeight: string;
  contentHeightNumber = 2544;
  widthFromLeft = '0px';
  scrollToViewCount = 0;

  @HostListener('scroll', ['$event']) // for window scroll events
  onScroll($event){
    this.scrollToViewCount = 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
    this.widthOfClocks = this.myAnotherDiv.nativeElement.offsetWidth + 12;
    console.log(this.widthOfClocks);
    this.widthFromLeft = this.widthOfClocks + 'px';
    console.log(this.widthFromLeft);
  }

  animate() {
    this.slides.nativeElement.scrollIntoView({ behavior: 'smooth',  block: 'center' });
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
      this.runningTime = Math.round((((time.getTime()  / 1000) ) % this.secondsPerDay)
                                    * ((this.heightOfTimetable) / this.secondsPerDay))
                                    + 306 + 'px' ;
    });

  }

  ngAfterViewInit(){
    this.heightOfTimetable = this.myDiv.nativeElement.offsetHeight;
    this.widthOfClocks = this.myAnotherDiv.nativeElement.offsetWidth + 12;
    this.widthFromLeft = this.getClockWidth() + 'px';
  }


  getplacement(meeting){
    let top = '0px';
    const meetingDateTime = new Date(meeting.StartTime);

    top = Math.round(Math.round((((meetingDateTime.getTime() / 1000) + this.threeHoursInSeconds) % this.secondsPerDay)
      * (this.heightOfTimetable / this.secondsPerDay)))
      + 20 + 'px';

    return top;
  }

  getDuration(meeting){
    let height = '0px';

    const startTime = new Date (meeting.StartTime);
    const endTime = new Date (meeting.EndTime);
    const differenceInTime = (endTime.getTime() - startTime.getTime()) / 1000;
    height = (this.heightOfTimetable / this.secondsPerDay) * differenceInTime - 1 + 'px';

    return height;
  }

  getFontSize(meeting){
    let height = 0;

    const startTime = new Date (meeting.StartTime);
    const endTime = new Date (meeting.EndTime);
    const differenceInTime = (endTime.getTime() - startTime.getTime()) / 1000;

    height = Math.round(((this.heightOfTimetable / this.secondsPerDay) * differenceInTime) / 6) ;
    // height = 18px from 1h and 9px from 30min

    height < 18 ? height = this.fontSizeTiny : height = this.fontSizeBig;
    return height + 'px';
  }

  getClockWidth(){
    return this.widthOfClocks;
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
