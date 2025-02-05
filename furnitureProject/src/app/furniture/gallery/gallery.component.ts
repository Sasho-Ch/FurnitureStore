import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [NgFor, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {
  furnitures: Furniture[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFurniture().subscribe((furnitures) => {
      this.furnitures = furnitures;
    });
  }

}