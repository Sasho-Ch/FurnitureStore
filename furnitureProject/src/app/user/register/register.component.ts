import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.form.invalid) {
      return;
    }

    const {username, email, tel,password, rePassword} = this.form.value;
    this.userService.register(username!, email!, tel!, password!, rePassword!)
    .subscribe(() => {

      this.router.navigate(['/'])
    })
  }
}
