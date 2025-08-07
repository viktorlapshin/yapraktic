export type IngridientType = "bun" | "main" | "sauce";
export type BunConstructorItemType = "top" | "bottom";
export type LoadingState = "pending" | "fulfilled" | "rejected";

export interface Ingridient {
  _id: string;
  name: string;
  type: IngridientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
}

export interface UniqueIngridient extends Ingridient {
  uniqueId: string;
}

export interface User {
  name: string;
  email: string;
}

export interface Move {
  dragIndex: number;
  hoverIndex: number;
}
