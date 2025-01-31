import { User } from "./user";

export interface Furniture {
    _id: string,
    userId: User,
    model: string,
    year: number,
    description: string,
    price: number,
    img: string,
    __v: number,
}