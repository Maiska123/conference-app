import { Participant } from './participant.interface';

export interface Meeting {
  Subject: string;
  Organizer: string;
  StartTime: Date;
  EndTime: Date;
  Participants: Participant[];
  Description: string;
}
