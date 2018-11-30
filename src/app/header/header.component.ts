import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  getCurrentUser(): String {
    let currentUser = this.authService.currentUserValue;
    return (currentUser != null) ? currentUser.username : null
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
