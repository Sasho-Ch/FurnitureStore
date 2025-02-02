import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-gallery',
  imports: [NgIf, NgFor],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})

export class GalleryComponent implements OnInit {
  furnitures: Furniture[] = [];
  selectedItemId: string | null = null; // Track the selected item's ID

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFurniture().subscribe((furnitures) => {
      this.furnitures = furnitures;
    });
  }

}