import { Participant } from './participant.interface';

export interface Meeting {
  event_id: number;
  Subject: string;
  Organizer: string;
  StartTime: Date;
  EndTime: Date;
  Participants: Participant[];
  Description: string;
}
