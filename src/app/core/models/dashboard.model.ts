export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  lowStockProducts: number;
  totalInventoryValue: number;
}

export interface LowStockProduct {
  _id: string;
  name: string;
  quantity: number;
}

export interface RecentLog {
  _id: string;
  action: string;
  quantity: number;

  product?: {
    _id: string;
    name: string;
  };

  user?: {
    _id: string;
    name: string;
  };

  createdAt: string;
}
