import { Routes } from '@angular/router';
import { LayoutComponent } from './components/common/layout/layout.component';
import { InventoryListComponent } from './components/otherUsers/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/extras/inventory-form/inventory-form.component';
import { InventoryDetailComponent } from './components/common/inventory-detail/inventory-detail.component';
import { ReportsComponent } from './components/otherUsers/reports/reports.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { UserFormComponent } from './components/extras/user-form/user-form.component';
import { ConfigComponent } from './components/admin/config/config.component';
import { HistoryComponent } from './components/admin/history/history.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';
import { LoginComponent } from './components/common/login/login.component';
import { routesGuard } from './guards/routes.guard';
import { routesResolver } from './resolver/guard-resolver/routes.resolver';

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Login" },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch:'full'},
      { path: "dashboard", component: DashboardComponent, title: "Dashboard", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "inventory", component: InventoryListComponent, title: "Inventory", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "inventory/add", component: InventoryFormComponent, title: "Add Item", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "inventory/edit/:id", component: InventoryFormComponent, title: "Edit Item", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "inventory/detail/:id", component: InventoryDetailComponent, title: "Item Detail", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "reports", component: ReportsComponent, title: "Reports", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "users", component: UsersListComponent, title: "Users", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "users/add", component: UserFormComponent, title: "Add User", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "users/edit/:id", component: UserFormComponent, title: "Edit User", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "configuration", component: ConfigComponent, title: "Configurations", canActivate: [routesGuard], resolve: { auth: routesResolver } },
      { path: "history", component: HistoryComponent, title: "History", canActivate: [routesGuard], resolve: { auth: routesResolver } }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch:'full' }
];
