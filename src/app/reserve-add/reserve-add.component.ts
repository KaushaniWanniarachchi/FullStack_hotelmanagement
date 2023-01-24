import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';
import { AuthService } from '../auth/auth.service';
import { HostelDetailService } from '../hostel-detail/hostel-detail.service';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'hotel-reserve-add',
  templateUrl: './reserve-add.component.html',
  styleUrls: ['./reserve-add.component.css'],
  providers: [FormBuilder],
})
export class ReserveAddComponent implements OnInit {
  roomCategory: any;
  userMail: String = '';

  constructor(
    private reservationData: ReservationService,
    private alerty: AlertifyService,
    private roomData: HostelDetailService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllRoom();
    this.authService.findMe().subscribe((user) => {
      this.userMail = user.email;
    });
  }

  addReserve(form: NgForm) {
    this.reservationData.addReservation(form).subscribe(
      (res: any) => {
        this.reservationData.updateRoomCount(form).subscribe((res: any) => {});
        alert(res.msg);
        this.router.navigate(["/reserved"])
      },
      (err) => {
        this.alerty.error(err);
      }
    );
  }

  getAllRoom() {
    this.roomData.getAllRoom().subscribe(
      (res: any) => {
        this.roomCategory = Object.assign({}, res);
      },
      (err) => {}
    );
  }
}
