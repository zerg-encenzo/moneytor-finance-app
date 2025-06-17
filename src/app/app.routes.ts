import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'expenses',
    loadComponent: () => import('./pages/expenses/expenses.page').then( m => m.ExpensesPage)
  },
  {
    path: 'savings',
    loadComponent: () => import('./pages/savings/savings.page').then( m => m.SavingsPage)
  },
  {
    path: 'budgets',
    loadComponent: () => import('./pages/budgets/budgets.page').then( m => m.BudgetsPage)
  },
];

