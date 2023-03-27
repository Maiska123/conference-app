import { Participant } from './../interfaces/participant.interface';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Meeting } from '../interfaces/meeting.interface';
import { RoomData } from '../interfaces/room-data.interface';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private meetingsBaseURL = 'http://localhost:8080/api/events/'; // URL to web api
  // private meetingsUrl = './assets/meetings.json';  // URL to web api
  private conferenceRoomBaseURL = 'http://localhost:8080/api/rooms/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET meetings from the "server" */
  getMeetings(roomId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.meetingsBaseURL + roomId).pipe(
      tap((meetings) =>
        meetings.forEach((meeting) => {
          this.getParticipants(meeting);
        })
      ),
      tap((_) => console.log('fetched meetings')),
      catchError(this.handleError<Meeting[]>('getMeeting', []))
    );
  }

  getParticipants(meeting: Meeting) {
    return this.http
      .get<Participant[]>(
        this.meetingsBaseURL + meeting.event_id + '/participants'
      )
      .subscribe((Participants) => {
        console.log('fetched participants for event ' + meeting.event_id);
        meeting.Participants = Participants;
      });
  }

  getRoomName(roomId: number): Observable<RoomData> {
    return this.http.get<RoomData>(this.conferenceRoomBaseURL + roomId).pipe(
      tap((_) => console.log('fetched RoomData')),
      catchError(this.handleError<RoomData>('getRoomData'))
    );
  }

  getMeeting(roomId: number) {
    return this.getMeetings(roomId);
  }

  getConferenceRoomName(roomId: number) {
    return this.getRoomName(roomId);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // meetingInProgress(){

  //   const end = new Date(this.meetingData?.EndTime).valueOf();
  //   const start = new Date(this.meetingData?.StartTime).valueOf();
  //   const current = new Date(this.TimeIn).valueOf();

  //   if (current > start  && current < end){
  //     this.showMeeting = true;
  //     const timePassed = ((1 - (current - start ) / (end - start )) * (280));
  //     this.timeLeft = 280 - timePassed;

  //   } else { this.timeLeft = 280;
  //            this.showMeeting = false;
  //            this.nextMeeting.emit(this.showMeeting);
  //           }
  // }
}
