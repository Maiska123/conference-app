import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from '../../interfaces/meeting.interface';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.css']
})
export class DetailsViewComponent implements OnInit {

  @Input() meetingData: Meeting;

  constructor() { }

  ngOnInit() {
  }

}
