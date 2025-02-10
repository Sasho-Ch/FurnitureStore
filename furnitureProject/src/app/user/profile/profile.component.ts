import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ProfileDetails } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-profile',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  isEditing: boolean = false;
  profileData: ProfileDetails = { username: '', email: '', tel: '' };

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      if (data) {
        this.profileData = { username: data.username, email: data.email, tel: data.tel };
      }
    });

    this.userService.getProfile().subscribe();

    const {username, email, tel} = this.profileData;

    this.form.setValue({
      username,
      email,
      tel,
    }) 
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }
  
    const updatedProfile: ProfileDetails = this.form.value as ProfileDetails;
  
    this.userService.editProfile(updatedProfile).subscribe(() => {
      this.toggleEditMode();
    });
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }

}
