import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-furniture-details',
  imports: [NgIf],
  templateUrl: './furniture-details.component.html',
  styleUrl: './furniture-details.component.css'
})
export class FurnitureDetailsComponent {
  furniture: any = {
    img: 'https://i5.walmartimages.com/asr/516680b4-6329-458f-b650-c16e6e4183cf.1ea4eb16de56400c16fa84a9a4156d44.jpeg',
    model: 'Sofa',
    price: '200$',
    userId: {
      username: 'Sasho',
      tel: '123-321-123',
    },
    year: '2004',
    description: 'Very useful sofa for fun with girls',
    material: 'Matrix',

  }

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); 
  }
}
