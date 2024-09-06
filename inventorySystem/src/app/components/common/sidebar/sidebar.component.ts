import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../../services/extra/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../../../services/token/token.service';
import { PermissionsService } from '../../../services/extra/permissions/permissions.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isSidebarClosed = false;
  permissions: any;

  constructor(private sidebarService: SidebarService,
    private router: Router,
    private cookieService: CookieService,
    private permissionsService: PermissionsService
  ) {
    this.sidebarService.isSidebarClosed$.subscribe(
      (isClosed) => (this.isSidebarClosed = isClosed)
    );
  }

  ngOnInit(): void {
    this.permissions = this.permissionsService.getPermissions();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  //routes methods
  goInventory(){
    this.router.navigate(['inventory']);
  }

  goDashboard(){
    this.router.navigate(['dashboard']);
  }

  goReports(){
    this.router.navigate(['reports']);
  }

  goUsers(){
    this.router.navigate(['users']);
  }

  goConfig(){
    this.router.navigate(['configuration']);
  }

  goHistory(){
    this.router.navigate(['history']);
  }

  logout(){
    this.cookieService.delete('invToken');
    this.router.navigate(['login']);
  }

}
