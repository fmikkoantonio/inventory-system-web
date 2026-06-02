export interface Product {
  _id?: string;
  name: string;
  sku: string;
  description?: string;
  quantity: number;
  price: number;
  category?: string;
  image?: string;
}
