import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Furniture } from '../../types/furniture';

@Component({
  selector: 'app-gallery',
  imports: [NgIf, NgFor],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  furnitureItems = [
    {
      img: 'https://i5.walmartimages.com/asr/1a1bbb46-5e69-4d32-a998-7926df94f803_1.e081b98d040b819df7decaf9e729b041.jpeg',
      model: 'Sofa',
      price: 240,
      ownerName: 'Sasho',
      year: 2003,
      description: 'Very comfortable',
      likes: 2,
      showDetails: false,
    }
  ]





  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }
}
