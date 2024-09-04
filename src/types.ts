export interface Product {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
  categories?: string[];
}

export interface Bouquet extends Product {
  categories: string[];
}

export interface Toy extends Product {
}

export interface Postcard extends Product {
}

export interface CartItemState {
  items: Product[];
  productId: number;
  quantity: number;
  price: number;
}

export interface Database {
  bouquets: Bouquet[];
  toys: Toy[];
  postcards: Postcard[];
}
