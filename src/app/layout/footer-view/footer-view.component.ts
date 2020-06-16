import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';

@Component({
  selector: 'app-footer-view',
  templateUrl: './footer-view.component.html',
  styleUrls: ['./footer-view.component.css']
})
export class FooterViewComponent implements OnInit {

  @Input() meetingData: Meeting;

  constructor() { }

  ngOnInit() {
  }

}
