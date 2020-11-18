import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { SidenavService } from '../../services/sidenav-details.service';
import { trigger, state, style, transition, animate, stagger, query, keyframes } from '@angular/animations';
import { MeetingsService } from '../../services/meetings.service';
import { Subscription, timer, VirtualTimeScheduler } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html',
  styleUrls: ['./footer-view.component.css'],
  animations: [
    trigger('flyInOut', [
      state('open', style({
        opacity: 0
       })),
      state('closed', style({
        opacity: 1
       })),
      transition('* => *', [
        animate('1.5s', keyframes ( [
          style({ offset: 0.3,  }),
          style({ offset: 0.7 , transform: 'translateY(15vh)', opacity: 0.0}),
        ]))
      ])
    ]),
  ]
})
export class FooterViewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() TimeIn: Date;
  @Input() roomIdIn: number;
  @Input() showMeeting: boolean;

  public meetingData: Meeting[];
  public currentMeetingInProgress: Meeting;
  private meetingSubscription: Subscription;

  constructor(private meetingsService: MeetingsService) { }

  // Jos halutaan ajastettua tietojenhakua
  //
  // ngOnInit() {
  //   this.meetingSubscription = timer(0, 10000).pipe(
  //     switchMap(() => this.meetingsService.getMeetings(this.roomIdIn))
  //   )
  //   .subscribe(currentMeetings => {
  //     this.meetingData = currentMeetings.reverse();
  //   });
  // }

  ngOnInit() {
    this.meetingSubscription = this.meetingsService.getMeetings(this.roomIdIn)
    .subscribe(currentMeetings => {
      this.meetingData = currentMeetings.reverse();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateMeetings();
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  ngOnDestroy(): void {
    this.meetingSubscription.unsubscribe();
  }

  updateMeetings(): void{

    if ( this.meetingData !== undefined)
    {
      this.meetingData.forEach((meeting, index) => {

          const endNext = new Date(meeting?.EndTime).valueOf();
          const startNext = new Date(meeting?.StartTime).valueOf();
          const currentNext = new Date(this.TimeIn).valueOf();
          if ( currentNext > endNext ){
            this.meetingData = this.meetingData.filter((_, filterIndex) => filterIndex !== index);
          }

          if ( currentNext > startNext  && currentNext < endNext ){
            this.meetingData = this.meetingData.filter((_, filterIndex) => filterIndex !== index);
          }
      });
    }
  }
}
