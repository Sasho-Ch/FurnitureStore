import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Furniture } from "./types/furniture";
import { User } from "./types/user";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    constructor(private http: HttpClient) {}

    getFurniture() {
        return this.http.get<Furniture[]>(`http://localhost:3000/furnitures`, {withCredentials: true});
    }

    getSingleFurniture(id: string) {
        return this.http.get<Furniture>(`http://localhost:3000/furnitures/${id}`, {withCredentials: true});
    }

    createFurniture(model: string, year: number, description: string, price: number, img: string, material: string) {
        const payload = {model, year, description, price, img, material};
        return this.http.post<Furniture>(`http://localhost:3000/furnitures`, payload, {withCredentials: true});
    }

    deleteFurniture(id: string) {
        return this.http.delete<Furniture>(`http://localhost:3000/furnitures/${id}`, {withCredentials: true});
    }

}