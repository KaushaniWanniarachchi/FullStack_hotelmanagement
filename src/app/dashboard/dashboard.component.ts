import { Component, OnInit } from '@angular/core';
import { HostelDetailService } from '../hostel-detail/hostel-detail.service';

@Component({
  selector: 'hostel-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'Sea Side South Park Hotel';
  roomCategory: any;

  constructor(private roomData: HostelDetailService) {}

  ngOnInit(): void {
    this.getAllRoom();
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
