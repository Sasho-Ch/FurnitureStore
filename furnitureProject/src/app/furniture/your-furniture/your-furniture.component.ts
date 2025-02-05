import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Furniture } from '../../types/furniture';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-your-furniture',
  imports: [NgFor, RouterLink],
  templateUrl: './your-furniture.component.html',
  styleUrl: './your-furniture.component.css',
})
export class YourFurnitureComponent implements OnInit {
  furnitures: Furniture[] = [];
  userFurnitures: Furniture[] = [];

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    // Fetch user profile first
    this.userService.getProfile().subscribe(user => {
      if (!user?.furnitures) {
        console.warn("⚠️ No furnitures found for user!");
        return;
      }

      // Fetch all furniture after ensuring user data is loaded
      this.apiService.getFurniture().subscribe((furnitures) => {
        this.furnitures = furnitures;
        this.userFurnitures = this.furnitures.filter(furniture =>
          user.furnitures.includes(furniture._id)
        );
      });
    });
  }
}