import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Furniture } from "./types/furniture";

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    constructor(private http: HttpClient) {}

    getFurniture() {
        return this.http.get<Furniture>(`http://localhost:3000/furnitures`);
    }

    getSingleFurniture(id: string) {
        return this.http.get<Furniture>(`http://localhost:3000/furnitures/${id}`);
    }

    createFurniture(model: string, year: number, description: string, price: number, img: string, material: string) {
        const payload = {model, year, description, price, img, material};
        return this.http.post<Furniture>(`http://localhost:3000/furnitures`, payload);
    }

    deleteFurniture(id: string) {
        return this.http.delete<Furniture>(`http://localhost:3000/furnitures/${id}`);
    }
}