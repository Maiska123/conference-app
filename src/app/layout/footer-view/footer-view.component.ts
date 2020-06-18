import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { SidenavService } from '../../services/sidenav-details.service';
import { trigger, state, style, transition, animate, stagger, query, keyframes } from '@angular/animations';

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
export class FooterViewComponent implements OnInit {

  @Input() meetingData: Meeting[];
  @Input() TimeIn: Date;
  @Input() showMeeting: boolean;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  toggleRightSidenav() {
    this.sidenavService.toggle();
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
