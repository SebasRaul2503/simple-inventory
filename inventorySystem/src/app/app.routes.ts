import { Routes } from '@angular/router';
import { LayoutComponent } from './general/layout/layout.component';
import { InventoryListComponent } from './normalUser/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './extras/inventory-form/inventory-form.component';
import { InventoryDetailComponent } from './general/inventory-detail/inventory-detail.component';
import { ReportsComponent } from './normalUser/reports/reports.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { UserFormComponent } from './extras/user-form/user-form.component';
import { ConfigComponent } from './admin/config/config.component';
import { HistoryComponent } from './admin/history/history.component';
import { DashboardComponent } from './normalUser/dashboard/dashboard.component';
import { PageNotFoundComponent } from './extras/page-not-found/page-not-found.component';
import { LoginComponent } from './general/login/login.component';
import { routesGuard } from './guards/routes.guard';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Login" },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch:'full'},
      { path: "dashboard", component: DashboardComponent, title: "Dashboard", canActivate: [routesGuard] },
      { path: "inventory", component: InventoryListComponent, title: "Inventory", canActivate: [routesGuard] },
      { path: "inventory/add", component: InventoryFormComponent, title: "Add Item", canActivate: [routesGuard] },
      { path: "inventory/edit/:id", component: InventoryFormComponent, title: "Edit Item", canActivate: [routesGuard] },
      { path: "inventory/detail/:id", component: InventoryDetailComponent, title: "Item Detail", canActivate: [routesGuard] },
      { path: "reports", component: ReportsComponent, title: "Reports", canActivate: [routesGuard] },
      { path: "users", component: UsersListComponent, title: "Users", canActivate: [routesGuard] },
      { path: "users/add", component: UserFormComponent, title: "Add User", canActivate: [routesGuard] },
      { path: "users/edit/:id", component: UserFormComponent, title: "Edit User", canActivate: [routesGuard] },
      { path: "configuration", component: ConfigComponent, title: "Configurations", canActivate: [routesGuard] },
      { path: "history", component: HistoryComponent, title: "History", canActivate: [routesGuard] }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch:'full' }
];
