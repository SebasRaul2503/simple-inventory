import { Injectable } from '@angular/core';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {
  constructor(private tokenService: TokenService) {}

  getPermissions() {
    const role = this.tokenService.getUserRole();
    let permissions = {
      canViewDashboard: false,
      canViewInventory: false,
      canViewReports: false,
      canViewUsers: false,
      canViewConfig: false,
      canViewHistory: false,
    };

    switch (role) {
      case 1: // Admin
        permissions = {
          canViewDashboard: true,
          canViewInventory: true,
          canViewReports: true,
          canViewUsers: true,
          canViewConfig: true,
          canViewHistory: true,
        };
        break;
      case 2: // Manager
        permissions = {
          canViewDashboard: true,
          canViewInventory: true,
          canViewReports: true,
          canViewUsers: false,
          canViewConfig: false,
          canViewHistory: true,
        };
        break;
      case 3: // Staff
        permissions = {
          canViewDashboard: true,
          canViewInventory: true,
          canViewReports: false,
          canViewUsers: false,
          canViewConfig: false,
          canViewHistory: true,
        };
        break;
      default:
        break;
    }

    return permissions;
  }
}
