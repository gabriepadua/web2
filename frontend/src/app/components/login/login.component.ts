import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.email, this.senha).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        console.log('User logged in:', response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error logging in:', error);
      }
    );
  }
}
