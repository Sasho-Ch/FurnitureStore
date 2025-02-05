import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  isEditing = true;
  profileData: ProfileDetails = { username: '', email: '', tel: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      if (data) {
        this.profileData = { username: data.username, email: data.email, tel: data.tel };
      }
    });

    this.userService.getProfile().subscribe();
  }

}
