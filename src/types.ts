export interface Meal {
  id: string;
  meal: string;
  price: number;
  img: string;
  instructions: string;
  category: string;
}

export interface CartItem {
  id: string;
  meal: string;
  price: number;
  img: string;
  quantity: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
