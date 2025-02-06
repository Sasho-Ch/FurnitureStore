import { Url } from "node:url";
import { User } from "./user";

export interface Furniture {
    _id: string,
    _ownerId: User,
    model: string,
    year: number,
    description: string,
    price: number,
    img: string,
    material: string,
    __v: number,
}