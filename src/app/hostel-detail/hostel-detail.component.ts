import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Prices } from '../prices';
import { Availability } from '../availability';
import { AdminService } from '../admin/admin.service';
import { HostelDetailService } from './hostel-detail.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';

@Component({
  selector: 'hostel-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styleUrls: ['./hostel-detail.component.css'],
})
export class HostelDetailComponent implements OnInit {
  prices: Prices;
  room: any[];
  roomCategory: any;
  user: User;

  availability: Availability = {
    boysStandardRooms: 0, // 12
    boysDeluxeRooms: 0, // 15
    boysSuperDeluxeRooms: 0, // 10
    girlsStandardRooms: 0, // 13
    girlsDeluxeRooms: 0, // 15
    girlsSuperDeluxeRooms: 0, // 11
  };

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private roomData: HostelDetailService
  ) {
    this.authService.findMe().subscribe((user) => (this.user = user));
    this.adminService
      .findHostelPriceDetails()
      .subscribe((hostelPriceDetail) => (this.prices = hostelPriceDetail));

    this.adminService.boysSuperDeluxRooms().subscribe((total) => {
      this.availability.boysSuperDeluxeRooms = total.length;
    });
    this.adminService.boysDeluxRooms().subscribe((total) => {
      this.availability.boysDeluxeRooms = total.length;
    });
    this.adminService.boysStandardRooms().subscribe((total) => {
      this.availability.boysStandardRooms = total.length;
    });
    this.adminService.girlsSuperDeluxRooms().subscribe((total) => {
      this.availability.girlsSuperDeluxeRooms = total.length;
    });
    this.adminService.girlsDeluxRooms().subscribe((total) => {
      this.availability.girlsDeluxeRooms = total.length;
    });
    this.adminService.girlsStandardRooms().subscribe((total) => {
      this.availability.girlsStandardRooms = total.length;
    });
  }

  ngOnInit() {
    this.getAllRoom();
  }
  getAllRoom() {
    this.roomData.getAllRoom().subscribe(
      (res: any) => {
        console.log(typeof(res));
        
        this.roomCategory = Object.assign({}, res);
        this.room = res;
      },
      (err) => {}
    );
  }
}
