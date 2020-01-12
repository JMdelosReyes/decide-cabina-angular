import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    console.log(this.token);

    if (this.token || this.token !== '') {
      this.authService.getUser(this.token).subscribe((res) => {
        console.log(res);
        this.authService.changeLoggedStatus(true);
      }, (error) => {
        console.log(error);
        this.authService.changeLoggedStatus(false);
        this.authService.removeToken();
      });
    } else {
      this.authService.changeLoggedStatus(false);
    }
  }
}
