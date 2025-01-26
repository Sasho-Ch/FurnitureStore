import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Furniture } from "./types/furniture";

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    constructor(private http: HttpClient) {}

    getFurniture() {
        return this.http.get<Furniture>(`http://localhost:3000/furnitures`)
    }
}