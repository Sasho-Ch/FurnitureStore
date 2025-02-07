import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GalleryComponent } from './furniture/gallery/gallery.component';
import { AddFurnitureComponent } from './furniture/add-furniture/add-furniture/add-furniture.component';
import { NewsComponent } from './news/news.component';
import { YourFurnitureComponent } from './furniture/your-furniture/your-furniture.component';
import { FurnitureDetailsComponent } from './furniture/furniture-details/furniture-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
     path: 'gallery',
     children: [
      {path: '', component: GalleryComponent},
      {
        path: ':furnitureId',
        component: FurnitureDetailsComponent,
      }
     ], 
  },

  { path: 'add-furniture', component: AddFurnitureComponent },
  { path: 'your-furniture', 
    children: [
      {path: '', component: YourFurnitureComponent},
      {path: ':furnitureId', component: FurnitureDetailsComponent},
    ]
     },
  { path: 'news', component: NewsComponent },
];
