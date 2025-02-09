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
    this.userService.getProfile().subscribe(user => {
      if (!user) {
        console.warn("User not logged in or session expired!");
        return;
      }
  
      this.apiService.getFurniture().subscribe((furnitures) => {
        this.furnitures = furnitures;
        this.userFurnitures = this.furnitures.filter(furniture =>
          user.furnitures?.includes(furniture._id)
        );
      });
    });
  }
}