import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nome = '';
  email = '';
  senha = '';

  constructor(private userService: UserService) {}

  register(): void {
    this.userService.register(this.nome, this.email, this.senha).subscribe(
      response => {
        console.log('User registered:', response);
      },
      error => {
        console.error('Error registering user:', error);
      }
    );
  }
}
