import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-furniture',
  imports: [FormsModule],
  templateUrl: './add-furniture.component.html',
  styleUrl: './add-furniture.component.css'
})
export class AddFurnitureComponent {

  constructor (private apiService: ApiService, private router: Router) {}

  addFurniture(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
    const {model, year, description, price, img, material} = form.value;
    
    this.apiService.createFurniture(model, year, description, price, img, material).subscribe(() => {
      this.router.navigate(['/gallery'])
    })

  }

}
