import { environment } from './../../environments/environment';
import { map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {

  constructor(
    private http: HttpClient
  ) { }

  // Example function (subscribe to it to be able to use the data);
  public getMeasurements() {
    return this.http.get(`${environment.API_URL}/measurements`).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }

  public getTemperatureMeasurements() {
    return this.http.get(`${environment.API_URL}/measurements/temperature`).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }

  public getHistoricTemperatureMeasurements() {
    return this.http.get(`${environment.API_URL}/measurements/temperature/history`).pipe(
      map(result => result),
      catchError(() => {
        return of(false);
      })
    );
  }
}

