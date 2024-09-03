// Интерфейс для букетов
export interface Bouquet {
  id: number;
  name: string;
  categories: string[];
  price: number;
  photoUrl: string;
}

// Интерфейс для игрушек
export interface Toy {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
}

// Интерфейс для открыток
export interface Postcard {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
}

// Общий интерфейс для базы данных
export interface Database {
  bouquets: Bouquet[];
  toys: Toy[];
  postcards: Postcard[];
}