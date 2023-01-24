import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = "http://localhost:4050/api/reserve/addReservation"
  updateUrl = "http://localhost:4050/api/room/updateRoom"
  getReservationUrl = "http://localhost:4050/api/reserve/getReservation"

  constructor(private http: HttpClient) { }
  addReservation(data: any) {
    return this.http.post(this.url, data);
  }

  getReservationDetails(mail: any) {
    return this.http.get(this.getReservationUrl, mail);
  }

  updateRoomCount(category: any) {
    return this.http.put(this.updateUrl, category);
  }
}
