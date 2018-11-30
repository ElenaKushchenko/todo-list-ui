import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";

@Component({
  selector: 'todo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  login: string;
  password: string;
  email: string;

  valid: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onSignUp() {
    if (!this.login || !this.password) {
      this.valid = false;
      return;
    }

    this.valid = true;

    let user = new User(this.login, null, this.password, this.email);
    this.authService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error)
        });
  }
}
