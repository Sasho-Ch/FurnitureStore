import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureModel } from '../../types/furniture';

@Component({
  selector: 'app-edit-furniture',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-furniture.component.html',
  styleUrl: './edit-furniture.component.css',
})
export class EditFurnitureComponent {
  furnitureData: FurnitureModel = {
    model: '',
    year: 0,
    description: '',
    price: 0,
    img: '',
    material: '',
  };

  form = new FormGroup({
    model: new FormControl('', []),
    year: new FormControl(0, []),
    description: new FormControl('', []),
    price: new FormControl(0, []),
    img: new FormControl('', []),
    material: new FormControl('', []),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['furnitureId'];
    this.apiService.getSingleFurniture(id).subscribe((data) => {
      if (data) {
        this.furnitureData = {
          model: data.model,
          year: data.year,
          description: data.description,
          price: data.price,
          img: data.img,
          material: data.material,
        };
  
        // Set the form values after data is loaded
        this.form.setValue({
          model: this.furnitureData.model,
          year: this.furnitureData.year,
          description: this.furnitureData.description,
          price: this.furnitureData.price,
          img: this.furnitureData.img,
          material: this.furnitureData.material
        });
      }
    });
  }


  editFurniture() {
    if (this.form.invalid) {
      return;
    }
  
    const id = this.route.snapshot.params['furnitureId']; // Get the furniture ID from the URL
    const updatedFurniture: FurnitureModel = this.form.value as FurnitureModel;
  
    this.apiService.editFurniture(id, updatedFurniture).subscribe({
      next: () => {
        this.router.navigate(['/gallery']);
      },
      error: (err) => {
        console.error('Error updating furniture:', err);
      }
    });
  }
}
