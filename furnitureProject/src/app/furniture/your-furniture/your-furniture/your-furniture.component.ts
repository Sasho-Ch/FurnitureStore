import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-your-furniture',
  imports: [NgFor, NgIf],
  templateUrl: './your-furniture.component.html',
  styleUrl: './your-furniture.component.css'
})
export class YourFurnitureComponent {
  furnitureItems = [
    {
      img: 'https://i5.walmartimages.com/asr/1a1bbb46-5e69-4d32-a998-7926df94f803_1.e081b98d040b819df7decaf9e729b041.jpeg',
      model: 'Sofa',
      price: 240,
      ownerName: 'Sasho',
      year: 2003,
      description: 'Very comfortable',
      showDetails: false,
    }
  ]





  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }
}
