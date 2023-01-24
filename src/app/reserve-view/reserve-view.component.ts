import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ReserveViewService } from './reserve-view.service';

export interface PeriodicElement {
  roomCategory: string;
  firstName: string;
  lastName: string;
  gender: string;
  mobileNo: Number;
  email: String;
  checkIn: any;
  checkOut: any;
}

@Component({
  selector: 'pm-reserve-view',
  templateUrl: './reserve-view.component.html',
  styleUrls: ['./reserve-view.component.css'],
})
export class ReserveViewComponent implements OnInit {
  displayedColumns: string[] = [
    'roomCategory',
    'firstName',
    'lastName',
    'gender',
    'mobileNo',
    'email',
    'checkIn',
    'checkOut',
  ];
  dataSource: any;

  constructor(
    private reserveView: ReserveViewService,
    private authService: AuthService
  ) {}

  getReservedDetailsByMail(mail: any) {
    this.reserveView.getReservationDetails(mail).subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.authService.findMe().subscribe((user) => {
      this.getReservedDetailsByMail(user.email);
    });
  }
}
