import { authGuard } from './core/guards/auth.guard';

export const routes = [
  {
    path: '',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./features/products/components/add-product/add-product').then(
        (m) => m.AddProductComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then((m) => m.ProductsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories').then((m) => m.CategoriesComponent),
    canActivate: [authGuard],
  },
  {
    path: 'products/edit/:id',
    loadComponent: () =>
      import('./features/products/components/edit-product/edit-product').then(
        (m) => m.EditProductComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'activity',
    loadComponent: () => import('./features/activity/activity').then((m) => m.ActivityComponent),
    canActivate: [authGuard],
  },
];
