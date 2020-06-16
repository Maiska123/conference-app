import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Meeting } from '../interfaces/meeting.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private meetingsUrl = './assets/meetings.json';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) {}

      /** GET meetings from the "server" */
  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.meetingsUrl)
    .pipe(
      tap(_ => console.log('fetched meetings')),
      catchError(this.handleError<Meeting[]>('getMeeting', []))
    );
  }

  getMeeting(){
    return this.getMeetings();
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

}
