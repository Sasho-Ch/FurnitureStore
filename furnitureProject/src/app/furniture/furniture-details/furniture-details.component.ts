import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-furniture-details',
  imports: [NgIf],
  templateUrl: './furniture-details.component.html',
  styleUrl: './furniture-details.component.css'
})
export class FurnitureDetailsComponent {
  furniture = {} as Furniture;
  user = {} as User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['furnitureId'];
    this.apiService.getSingleFurniture(id).subscribe((furniture) => {
      this.furniture = furniture;
      const userId = furniture._ownerId._id;
      this.userService.getUserInfo(userId).subscribe((user) => {
        this.user = user;
      })
    })
  }



  goBack() {
    this.router.navigate(['/gallery']); 
  }
}
