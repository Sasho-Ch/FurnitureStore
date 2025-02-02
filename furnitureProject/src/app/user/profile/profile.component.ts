import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { log } from 'console';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  isEditing = true;
  profileData: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.user!) {
      const { username, email, tel } = this.userService.user!;
      this.profileData = { username, email, tel };
    } else {
      console.warn('User is not logged in or user data is not available.');
    }
  }

}
