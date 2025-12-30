
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  category: string; // Changé de union à string pour la flexibilité
  price: number;
  description: string;
  images: string[];
  details: string[];
  realizationTime: string;
  waitingTime: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  notes?: string;
}

export type View = 'home' | 'shop' | 'product-detail' | 'checkout' | 'advisor' | 'admin-login' | 'admin-dashboard';
