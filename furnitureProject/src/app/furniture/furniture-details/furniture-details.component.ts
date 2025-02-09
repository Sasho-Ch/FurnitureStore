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
  isOwner: boolean = false;
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
  
      let userId: string;
  
      if (typeof furniture._ownerId === "object" && furniture._ownerId !== null) {
        userId = furniture._ownerId._id; 
      } else {
        userId = furniture._ownerId as string;
      }
  
      if (!userId) {
        return;
      }
  
      this.userService.getUserInfo(userId).subscribe((user) => {
        this.user = user;
        this.userService.getProfile().subscribe((currentUser) => {
          const currentId = currentUser?._id;
          if(currentId === userId) {
            this.isOwner = true;
          }
        })
      });


    });
  }

  deleteFurniture() {
    if (confirm('Are you sure you want to delete this furniture item?')) {
      this.apiService.deleteFurniture(this.furniture!._id).subscribe(() => {
        this.router.navigate(['/gallery']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/gallery']); 
  }
}
