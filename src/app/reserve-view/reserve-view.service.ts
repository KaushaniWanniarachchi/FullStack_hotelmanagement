import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReserveViewService {
  getReservationUrl = 'http://localhost:4050/api/reserve/getReservation';

  constructor(private http: HttpClient) {}

  getReservationDetails(mail: any) {
    return this.http.get(this.getReservationUrl + '/' + mail);
  }
}
