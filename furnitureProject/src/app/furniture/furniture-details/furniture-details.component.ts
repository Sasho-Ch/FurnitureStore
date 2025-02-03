import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Furniture } from '../../types/furniture';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-furniture-details',
  imports: [NgIf],
  templateUrl: './furniture-details.component.html',
  styleUrl: './furniture-details.component.css'
})
export class FurnitureDetailsComponent {
  furniture = {} as Furniture;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['furnitureId'];
    this.apiService.getSingleFurniture(id).subscribe((furniture) => {
      this.furniture = furniture;
    })
  }



  goBack() {
    this.router.navigate(['/gallery']); 
  }
}
