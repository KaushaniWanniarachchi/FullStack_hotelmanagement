import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';

@Component({
  selector: 'pm-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  currentRate: any = 0;
  user: User;

  constructor(private authService: AuthService) {
    this.authService.findMe().subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {}

  feedBackOnclick() {
    alert('Feedback successfully sent');
  }

  ratingOnClick() {
    alert('Rate successfully submitted');
  }
}
