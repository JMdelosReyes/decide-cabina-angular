import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.statusChanged.subscribe(res => {
      this.isLogged = res;
    });
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout().subscribe(res => {
      this.authService.removeToken();
      this.authService.changeLoggedStatus(false);
      this.router.navigate(['']);
    }, error => {
      console.log(error);
    });
  }
}
