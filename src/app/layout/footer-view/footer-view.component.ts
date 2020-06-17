import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';
import { SidenavService } from '../../services/sidenav-details.service';

@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html',
  styleUrls: ['./footer-view.component.css']
})
export class FooterViewComponent implements OnInit {

  @Input() meetingData: Meeting;
  @Input() TimeIn: Date;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  toggleRightSidenav() {
    this.sidenavService.toggle();
  }
}
