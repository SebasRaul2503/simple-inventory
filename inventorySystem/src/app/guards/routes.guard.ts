import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token/token.service';
import { PermissionsService } from '../services/extra/permissions/permissions.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class routesGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private tokenService: TokenService,
    private permissionsService: PermissionsService // Inyectamos el servicio de permisos
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.cookieService.get('invToken');

    // Si no existe el token, redirige a la página de login
    if (!token) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.tokenService.validateTokenAsync().pipe(
      map(isValid => {
        if (isValid) {
          // Verificamos los permisos del usuario a través del servicio de permisos
          const permissions = this.permissionsService.getPermissions();

          // Según la ruta, verificamos los permisos necesarios
          const routePath = route.routeConfig?.path;

          let hasPermission = false; // Inicializamos la bandera de permiso

          switch (routePath) {
            case 'dashboard':
              hasPermission = permissions.canViewDashboard;
              break;
            case 'inventory':
            case 'inventory/add':
            case 'inventory/edit/:id':
            case 'inventory/detail/:id':
              hasPermission = permissions.canViewInventory;
              break;
            case 'reports':
              hasPermission = permissions.canViewReports;
              break;
            case 'users':
            case 'users/add':
            case 'users/edit/:id':
              hasPermission = permissions.canViewUsers;
              break;
            case 'configuration':
              hasPermission = permissions.canViewConfig;
              break;
            case 'history':
              hasPermission = permissions.canViewHistory;
              break;
            default:
              hasPermission = false;
              break;
          }

          if (!hasPermission) {
            // Si no tiene permisos, redirigimos al dashboard
            this.router.navigate(['dashboard']);
            return false;
          }

          return true; // Si tiene permiso, permitimos el acceso
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }),
      catchError((error) => {
        window.alert('Error de autenticación: ' + error);
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
